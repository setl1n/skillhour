import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import LessonGrid from './components/LessonGrid';
import HostLessonModal from './components/HostLessonModal';

const SkillsHub = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Available Lessons</h1>
                {isAuthenticated && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Host a Lesson
                    </button>
                )}
            </div>
            <LessonGrid />
            <HostLessonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default SkillsHub;