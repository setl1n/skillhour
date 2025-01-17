import { useEffect, useState } from 'react';
import LessonCard from './LessonCard';
import { Lesson, skillshubService } from '../../../services/SkillshubService';

const LessonGrid = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const data = await skillshubService.getAllLessons();
                setLessons(data);
            } catch (error) {
                console.error('Failed to fetch lessons:', error);
            }
        };

        fetchLessons();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </div>
    );
};

export default LessonGrid;
