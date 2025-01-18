import { useState } from 'react';
import Modal from '../../../components/Modal';
import { User, userService } from '../../../services/UserService';
import { FaStar, FaCheck } from 'react-icons/fa';
import { TeacherReview } from '../../../services/UserService';

interface TeacherReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    instructor: User;
    lessonId: string;
    onSubmitSuccess: (newReview: TeacherReview) => void; // <- change signature to accept a param
}

const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (val: number) => void; label: string }) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                    key={star}
                    className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                />
            ))}
        </div>
    </div>
);

const TeacherReviewModal = ({ isOpen, onClose, instructor, lessonId, onSubmitSuccess }: TeacherReviewModalProps) => {
    const [overallScore, setOverallScore] = useState(0);
    const [knowledgeScore, setKnowledgeScore] = useState(0);
    const [deliveryScore, setDeliveryScore] = useState(0);
    const [comments, setComments] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const newReview = await userService.createTeacherReview(instructor.id, lessonId, {
                overallScore,
                knowledgeScore,
                deliveryScore,
                comments
            });
            onSubmitSuccess(newReview); // pass newReview
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
                    <h2 className="text-2xl font-bold text-gray-800">Review Instructor</h2>
                    <p className="text-gray-600 mt-2">
                        Reviewing {instructor.username}
                    </p>
                </div>
                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <StarRating rating={overallScore} setRating={setOverallScore} label="Overall Performance" />
                    <StarRating rating={knowledgeScore} setRating={setKnowledgeScore} label="Knowledge" />
                    <StarRating rating={deliveryScore} setRating={setDeliveryScore} label="Delivery" />
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full p-2 border rounded-lg resize-none h-24"
                            placeholder="Share your thoughts about the instructor..."
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
                        disabled={isSubmitting || !overallScore || !knowledgeScore || !deliveryScore}
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

export default TeacherReviewModal;