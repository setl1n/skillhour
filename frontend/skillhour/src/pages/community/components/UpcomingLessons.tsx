import { useEffect, useState } from 'react';
import LessonCard from '../../skillshub/components/LessonCard';
import skillshubService, { Lesson } from '../../../services/SkillshubService';

interface UpcomingLessonsProps {
    lessonIds: number[];
}

const UpcomingLessons = ({ lessonIds }: UpcomingLessonsProps) => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const lessonsData = await Promise.all(
                    lessonIds.map(id => skillshubService.getLessonById(id))
                );
                console.log("Lesson data", lessonsData)
                setLessons(lessonsData.filter(lesson => 
                    new Date(lesson.dateTime) > new Date()
                ).sort((a, b) => 
                    new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
                ));
            } finally {
                setLoading(false);
            }
        };

        fetchLessons();
    }, [lessonIds]);

    if (loading) return <div>Loading lessons...</div>;

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Upcoming Lessons</h2>
            {lessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No upcoming lessons</p>
            )}
        </div>
    );
};

export default UpcomingLessons;
