import { useState } from 'react';
import Modal from '../../../components/Modal';
import { User, userService } from '../../../services/UserService';
import { FaStar, FaCheck } from 'react-icons/fa';

interface StudentReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: User;
    lessonId: string;  // Add this new prop
    onConfirm: (studentId: string) => void;
}

const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (value: number) => void; label: string }) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`cursor-pointer text-2xl ${
                            star <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
        </div>
    );
};

const StudentReviewModal = ({ isOpen, onClose, student, lessonId, onConfirm }: StudentReviewModalProps) => {
    const [overallScore, setOverallScore] = useState(0);
    const [attentiveScore, setAttentiveScore] = useState(0);
    const [participationScore, setParticipationScore] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            await userService.createStudentReview(student.id, lessonId, {
                overallScore,
                attentiveScore,
                participationScore,
                comments
            });
            onConfirm(student.id);
            onClose();
        } catch (error) {
            console.error('Failed to submit review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <StarRating
                        rating={overallScore}
                        setRating={setOverallScore}
                        label="Overall Performance"
                    />
                    <StarRating
                        rating={attentiveScore}
                        setRating={setAttentiveScore}
                        label="Attentiveness"
                    />
                    <StarRating
                        rating={participationScore}
                        setRating={setParticipationScore}
                        label="Participation"
                    />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full p-2 border rounded-lg resize-none h-24"
                            placeholder="Share your thoughts about the student's performance..."
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 
                                 text-gray-700 font-medium transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !overallScore || !attentiveScore || !participationScore}
                        className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                                 font-medium transition-colors flex items-center justify-center gap-2 
                                 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        <FaCheck />
                        Submit Review
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default StudentReviewModal;
