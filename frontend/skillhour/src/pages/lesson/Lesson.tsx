import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lesson as LessonType, skillshubService } from '../../services/SkillshubService';
import LessonOverview from './components/LessonOverview';
import AttendingStudents from './components/AttendingStudents';

const Lesson = () => {
    const { id } = useParams();
    const [lesson, setLesson] = useState<LessonType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await skillshubService.getLessonById(Number(id));
                setLesson(data);
            } catch (error) {
                console.error('Failed to fetch lesson:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [id]);

    const handleEnrollmentSuccess = (userId: number) => {
        if (lesson) {
            const updatedLesson = {
                ...lesson,
                studentIds: [...lesson.studentIds, userId]
            };
            setLesson(updatedLesson);
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    }

    if (!lesson) {
        return <div className="container mx-auto px-4 py-8">Lesson not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <LessonOverview 
                        lesson={lesson} 
                        onEnrollmentSuccess={handleEnrollmentSuccess}
                    />
                </div>
                <div>
                    <AttendingStudents 
                        key={lesson.studentIds.length} // Force re-render when studentIds changes
                        studentIds={lesson.studentIds} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Lesson;
