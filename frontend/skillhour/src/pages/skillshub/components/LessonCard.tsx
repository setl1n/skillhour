import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaUsers, FaCoins } from 'react-icons/fa';
import { Lesson } from '../../../services/SkillshubService';
import { useNavigate } from 'react-router-dom';
import { calculateTimeCreds } from '../../../utils/timeUtils';

interface LessonCardProps {
    lesson: Lesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    };

    return (
        <motion.div
            className="h-full w-full"
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/lesson/${lesson.id}`)}
        >
            <div className="bg-surface/30 backdrop-blur-md rounded-xl shadow-sm overflow-hidden cursor-pointer hover:bg-surface/40 transition-colors h-full">
                <div className="p-6 h-full flex flex-col">
                    <div className="mb-2">
                        <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-primary">
                                    {lesson.skillTaught}
                                </h3>
                                <p className="text-sm text-text/60 mt-1">
                                    Hosted by: Instructor #{lesson.instructorId}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                lesson.isOnline 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-violet-100 text-violet-700'
                            }`}>
                                {lesson.isOnline ? '🌐 Online' : '📍 In Person'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="flex flex-col gap-3 text-text/80">
                            <div className="flex items-center gap-2">
                                <FaClock className="text-text/60" />
                                <span>
                                    {formatDate(lesson.dateTime)} - {new Date(lesson.endDateTime).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCoins className="text-amber-600" />
                                <span className="text-amber-600 font-medium">
                                    {calculateTimeCreds(lesson.dateTime, lesson.endDateTime)} TimeCreds
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-text/60" />
                                <span>{lesson.location || 'Virtual'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaUsers className="text-text/60" />
                                <span>{lesson.studentIds.length}/{lesson.maxCapacity} students</span>
                            </div>
                        </div>

                        <motion.button 
                            className="mt-4 w-full bg-primary/90 text-white py-2 rounded-lg hover:bg-primary transition-colors"
                            whileTap={{ scale: 0.98 }}
                        >
                            Book Now
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LessonCard;

