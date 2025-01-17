import { Lesson } from '../../../services/SkillshubService';
import skillshubService from '../../../services/SkillshubService';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { setCurrentLesson } from '../../../store/lesson/lessonSlice';
import { useState } from 'react';
import EndLessonModal from './EndLessonModal';

interface InstructorControlsProps {
    lesson: Lesson;
}

const InstructorControls = ({ lesson }: InstructorControlsProps) => {
    const [showEndModal, setShowEndModal] = useState(false);
    const dispatch = useTypedDispatch();

    const handleLessonStateUpdate = async (newState: 'FUTURE' | 'IN_PROGRESS' | 'ENDED') => {
        try {
            const updatedLesson = await skillshubService.updateLessonState(lesson.id, newState);
            dispatch(setCurrentLesson(updatedLesson));
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            alert('Failed to update lesson state: ' + errorMessage);
        }
    };

    switch (lesson.state) {
        case 'FUTURE':
            return (
                <button
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleLessonStateUpdate('IN_PROGRESS')}
                >
                    Start Lesson
                </button>
            );
        case 'IN_PROGRESS':
            return (
                <>
                    <button
                        className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => setShowEndModal(true)}
                    >
                        End Lesson
                    </button>
                    <EndLessonModal
                        isOpen={showEndModal}
                        onClose={() => setShowEndModal(false)}
                        onConfirm={() => handleLessonStateUpdate('ENDED')}
                        lesson={lesson}
                    />
                </>
            );
        case 'ENDED':
            return (
                <button
                    className="w-full bg-gray-500 text-white py-3 rounded-lg cursor-not-allowed"
                    disabled
                >
                    Lesson Ended
                </button>
            );
        default:
            return null;
    }
};

export default InstructorControls;
