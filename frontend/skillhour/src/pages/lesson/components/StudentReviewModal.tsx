import Modal from '../../../components/Modal';
import { User } from '../../../services/UserService';
import { FaStar, FaCheck } from 'react-icons/fa';

interface StudentReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: User;
    onConfirm: (studentId: string) => void;
}

const StudentReviewModal = ({ isOpen, onClose, student, onConfirm }: StudentReviewModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <div className="text-center">
                    <div className="flex justify-center mb-3">
                        <FaStar className="text-4xl text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Review Student</h2>
                    <p className="text-gray-600 mt-2">
                        Reviewing {student.username}
                    </p>
                </div>

                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                        Confirming that this student attended and participated in your lesson.
                        Their TimeCreds will be released upon your confirmation.
                    </p>
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
                            onConfirm(student.id);
                            onClose();
                        }}
                        className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                                 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <FaCheck />
                        Confirm Attendance
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default StudentReviewModal;
