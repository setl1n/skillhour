import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Lesson as LessonType, skillshubService } from '../../services/SkillshubService';
import LessonOverview from './components/LessonOverview';
import AttendingStudents from './components/AttendingStudents';
import InstructorInfo from './components/InstructorInfo';

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
        <div className="max-w-4xl mx-auto px-4 py-8 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10 h-[600px]">
                <div className="flex flex-col h-full space-y-6 pb-10">
                    <InstructorInfo lesson={lesson} />
                    <AttendingStudents
                        key={lesson.studentIds.length} // Force re-render when studentIds changes
                        studentIds={lesson.studentIds} 
                    />
                </div>
                <div className="flex flex-col h-full pb-10 space-y-6">
                    <LessonOverview
                        lesson={lesson} 
                        onEnrollmentSuccess={handleEnrollmentSuccess}
                    />
                    <div className="bg-surface/50 p-4 rounded-md flex-1">
                        <h2 className="text-lg font-semibold">Chat (Placeholder)</h2>
                        <p className="text-text/60">Chat functionality coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lesson;
