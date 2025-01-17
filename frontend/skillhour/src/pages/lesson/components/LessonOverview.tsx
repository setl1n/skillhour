import { FaMapMarkerAlt, FaClock, FaUsers, FaCoins } from 'react-icons/fa';
import { Lesson } from '../../../services/SkillshubService';
import { calculateTimeCreds } from '../../../utils/timeUtils';
import userService from '../../../services/UserService';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { updateTimeCredits } from '../../../store/auth/authSlice';

interface LessonOverviewProps {
    lesson: Lesson;
    onEnrollmentSuccess: (userId: number) => void;
}

const LessonOverview = ({ lesson, onEnrollmentSuccess }: LessonOverviewProps) => {
    const [enrolling, setEnrolling] = useState(false);
    const dispatch = useTypedDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const isUserEnrolled = user && lesson.studentIds.includes(Number(user.id));

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    const handleEnroll = async () => {
        if (!user?.id) {
            alert('User not logged in');
            return;
        }

        setEnrolling(true);
        try {
            const cost = calculateTimeCreds(lesson.dateTime, lesson.endDateTime);
            await userService.enrollInLesson(user.id, lesson.id.toString(), cost);
            
            // Update time credits in Redux store
            dispatch(updateTimeCredits(user.timeCred - cost));
            
            // Update lesson enrollment
            onEnrollmentSuccess(Number(user.id));
            
            alert('Enrollment successful');
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert('Enrollment failed: ' + errorMessage);
        } finally {
            setEnrolling(false);
        }
    };

    const canMarkAttendance = () => {
        const lessonTime = new Date(lesson.dateTime);
        const now = new Date();
        const timeDifference = lessonTime.getTime() - now.getTime();
        const fifteenMinutesInMs = 15 * 60 * 1000;
        return timeDifference <= fifteenMinutesInMs && timeDifference > 0;
    };

    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-primary mb-4">{lesson.skillTaught}</h1>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        lesson.isOnline 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-violet-100 text-violet-700'
                    }`}>
                        {lesson.isOnline ? '🌐 Online Class' : '📍 In-Person Class'}
                    </span>
                    <span className="text-text/60">
                        Instructor: {lesson.instructor?.username}
                    </span>
                </div>

                <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-3">
                        <FaClock className="text-text/60" />
                        <div>
                            <div>{formatDate(lesson.dateTime)}</div>
                            <div className="text-text/60 text-sm">
                                to {new Date(lesson.endDateTime).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCoins className="text-amber-600" />
                        <span className="text-amber-600 font-medium">
                            {calculateTimeCreds(lesson.dateTime, lesson.endDateTime)} TimeCreds
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-text/60" />
                        <span>{lesson.location || 'Virtual Meeting'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaUsers className="text-text/60" />
                        <span>{lesson.studentIds.length}/{lesson.maxCapacity} students enrolled</span>
                    </div>
                </div>

                {isUserEnrolled ? (
                    <div className="space-y-2">
                        <button 
                            className="w-full bg-green-500 text-white py-3 rounded-lg cursor-default"
                            disabled
                        >
                            You're Currently Enrolled
                        </button>
                        <p className="text-sm text-center text-text/60">
                            You can mark attendance 15 minutes before the lesson starts
                            {canMarkAttendance() && " - Ready for attendance!"}
                        </p>
                    </div>
                ) : (
                    <button 
                        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6"
                        onClick={handleEnroll}
                        disabled={enrolling}
                    >
                        {enrolling ? 'Enrolling...' : 'Enroll in Class'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LessonOverview;
