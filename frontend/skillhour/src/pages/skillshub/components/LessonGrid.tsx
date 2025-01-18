import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LessonCard from './LessonCard';
import { RootState } from '../../../store/store';
import { fetchLessons } from '../../../store/lesson/lessonSlice';
import type { AppDispatch } from '../../../store/store';

const LessonGrid = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { lessons, loading, error } = useSelector((state: RootState) => state.lesson);

    useEffect(() => {
        dispatch(fetchLessons());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center">Loading lessons...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {lessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </div>
    );
};

export default LessonGrid;
