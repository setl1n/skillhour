import Modal from '../../../components/Modal';
import { Lesson } from '../../../services/SkillshubService';
import { FaTrophy, FaCoins, FaClock } from 'react-icons/fa';

interface EndLessonModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    lesson: Lesson;
}

const EndLessonModal = ({ isOpen, onClose, onConfirm, lesson }: EndLessonModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <FaTrophy className="text-4xl text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
                    <p className="text-gray-600 mt-2">
                        You've successfully completed teaching
                    </p>
                    <p className="font-semibold text-primary mt-1">
                        {lesson.skillTaught}
                    </p>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                        <FaCoins className="text-xl text-amber-500" />
                        <div>
                            <p className="text-sm text-gray-600">TimeCreds Distribution</p>
                            <p className="text-gray-800">Review students now to receive your credits</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaClock className="text-xl text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-600">Automatic Distribution</p>
                            <p className="text-gray-800">Credits will be distributed in 24 hours</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 
                                 text-gray-700 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 
                                 font-medium transition-colors"
                    >
                        End & Review
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EndLessonModal;
