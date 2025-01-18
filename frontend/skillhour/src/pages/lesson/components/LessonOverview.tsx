import { FaMapMarkerAlt, FaClock, FaUsers, FaCoins } from 'react-icons/fa';
import { Lesson } from '../../../services/SkillshubService';
import { calculateTimeCreds } from '../../../utils/timeUtils';
import userService from '../../../services/UserService';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { updateTimeCredits } from '../../../store/auth/authSlice';
import { setCurrentLesson } from '../../../store/lesson/lessonSlice';
import InstructorControls from './InstructorControls';

interface LessonOverviewProps {
    lesson: Lesson;
    onEnrollmentSuccess: (userId: number) => void;
}

const LessonOverview = ({ lesson, onEnrollmentSuccess }: LessonOverviewProps) => {
    const [enrolling, setEnrolling] = useState(false);
    const dispatch = useTypedDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const currentLesson = useSelector((state: RootState) => state.lesson.currentLesson);

    const isUserEnrolled = user && (currentLesson?.studentIds || []).includes(Number(user.id));
    const isInstructor = user && Number(user.id) === currentLesson?.instructorId;

    useEffect(() => {
        // Initialize lesson state in Redux
        dispatch(setCurrentLesson(lesson));
    }, [lesson, dispatch]);

    // Use currentLesson from Redux instead of prop when available
    const displayLesson = currentLesson || lesson;

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
            const cost = calculateTimeCreds(displayLesson.dateTime, displayLesson.endDateTime);
            await userService.enrollInLesson(user.id, displayLesson.id.toString(), cost);

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
        const lessonTime = new Date(displayLesson.dateTime);
        const now = new Date();
        const timeDifference = lessonTime.getTime() - now.getTime();
        const fifteenMinutesInMs = 15 * 60 * 1000;
        return timeDifference <= fifteenMinutesInMs && timeDifference > 0;
    };

    const renderActionButton = () => {
        if (!user) {
            return (
                <p className="text-center text-text/60 mt-6">
                    Please log in to enroll in this class
                </p>
            );
        }

        if (isInstructor) {
            return <InstructorControls lesson={displayLesson} />;
        }

        // Student view based on lesson state
        if (displayLesson.state === 'ENDED') {
            return (
                <button
                    className="w-full bg-gray-500 text-white py-3 rounded-lg cursor-not-allowed"
                    disabled
                >
                    Lesson Ended
                </button>
            );
        }

        if (isUserEnrolled) {
            return (
                <div className="space-y-2">
                    {displayLesson.state === 'IN_PROGRESS' ? (
                        <button
                            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => console.log('Join lesson')}
                        >
                            Join Lesson
                        </button>
                    ) : (
                        <button
                            className="w-full bg-green-500 text-white py-3 rounded-lg cursor-default"
                            disabled
                        >
                            You're Currently Enrolled
                        </button>
                    )}
                </div>
            );
        }

        return (
            <button
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6"
                onClick={handleEnroll}
                disabled={enrolling || canMarkAttendance()}
            >
                {enrolling ? 'Enrolling...' :
                    canMarkAttendance() ? 'Enrollment Closed' : 'Enroll in Class'}
            </button>
        );
    };

    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-primary mb-4">{displayLesson.skillTaught}</h1>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-lg text-sm font-medium ${displayLesson.isOnline
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-violet-100 text-violet-700'
                        }`}>
                        {displayLesson.isOnline ? '🌐 Online Class' : '📍 In-Person Class'}
                    </span>
                    <span className="text-text/60">
                        Instructor: {displayLesson.instructor?.username}
                    </span>
                </div>

                <div className="space-y-4 text-base">
                    <div className="flex items-center gap-3">
                        <FaClock className="text-text/60" />
                        <div>
                            <div>{formatDate(displayLesson.dateTime)}</div>
                            <div className="text-text/60 text-sm">
                                to {new Date(displayLesson.endDateTime).toLocaleTimeString('en-US', {
                                    hour: 'numeric',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaCoins className="text-amber-600" />
                        <span className="text-amber-600 font-medium">
                            {calculateTimeCreds(displayLesson.dateTime, displayLesson.endDateTime)} TimeCreds
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-text/60" />
                        <span>{displayLesson.location || 'Virtual Meeting'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaUsers className="text-text/60" />
                        <span>{displayLesson.studentIds.length}/{displayLesson.maxCapacity} students enrolled</span>
                    </div>
                </div>

                <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${displayLesson.state === 'FUTURE' ? 'bg-blue-100 text-blue-700' :
                            displayLesson.state === 'IN_PROGRESS' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                        }`}>
                        {displayLesson.state.replace('_', ' ')}
                    </span>
                </div>

                {renderActionButton()}
            </div>
        </div>
    );
};

export default LessonOverview;
