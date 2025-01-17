import { FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { Lesson } from '../../../services/SkillshubService';

interface LessonOverviewProps {
    lesson: Lesson;
}

const LessonOverview = ({ lesson }: LessonOverviewProps) => {
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
                    <span className="text-text/60">Instructor #{lesson.instructorId}</span>
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
                        <FaMapMarkerAlt className="text-text/60" />
                        <span>{lesson.location || 'Virtual Meeting'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaUsers className="text-text/60" />
                        <span>{lesson.studentIds.length}/{lesson.maxCapacity} students enrolled</span>
                    </div>
                </div>

                <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors mt-6">
                    Enroll in Class
                </button>
            </div>
        </div>
    );
};

export default LessonOverview;
