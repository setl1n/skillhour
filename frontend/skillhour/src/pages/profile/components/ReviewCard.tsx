import { useState } from 'react';
import Card from '../../../components/Card';
import { TeacherReview, StudentReview } from '../../../services/UserService';

interface ReviewCardProps {
    type: 'teacher' | 'student';
    reviews: TeacherReview[] | StudentReview[];
}

interface TeacherAverages {
    overall: number;
    knowledge: number;
    delivery: number;
}

interface StudentAverages {
    overall: number;
    attentive: number;
    participation: number;
}

const ReviewCard = ({ type, reviews }: ReviewCardProps) => {
    const [currentCommentIndex, setCurrentCommentIndex] = useState(0);

    if (!reviews || reviews.length === 0) {
        return (
            <Card className="bg-surface-variant">
                <p className="text-gray-600">No {type} reviews yet</p>
            </Card>
        );
    }

    const nextComment = () => {
        setCurrentCommentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevComment = () => {
        setCurrentCommentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const calculateAverage = (scores: number[]) => {
        return scores.reduce((acc, curr) => acc + curr, 0) / scores.length;
    };

    const renderScoreBar = (score: number, label: string) => (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm font-medium">{score.toFixed(1)}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${(score / 5) * 100}%` }}
                />
            </div>
        </div>
    );

    const averages = type === 'teacher' 
        ? {
            overall: calculateAverage(reviews.map(r => r.overallScore)),
            knowledge: calculateAverage((reviews as TeacherReview[]).map(r => r.knowledgeScore)),
            delivery: calculateAverage((reviews as TeacherReview[]).map(r => r.deliveryScore))
        } as TeacherAverages
        : {
            overall: calculateAverage(reviews.map(r => r.overallScore)),
            attentive: calculateAverage((reviews as StudentReview[]).map(r => r.attentiveScore)),
            participation: calculateAverage((reviews as StudentReview[]).map(r => r.participationScore))
        } as StudentAverages;

    return (
        <Card className="bg-surface-variant">
            <div className="space-y-4">
                {/* Score Bars */}
                {renderScoreBar(averages.overall, 'Overall')}
                {type === 'teacher' ? (
                    <>
                        {renderScoreBar((averages as TeacherAverages).knowledge, 'Knowledge')}
                        {renderScoreBar((averages as TeacherAverages).delivery, 'Delivery')}
                    </>
                ) : (
                    <>
                        {renderScoreBar((averages as StudentAverages).attentive, 'Attentiveness')}
                        {renderScoreBar((averages as StudentAverages).participation, 'Participation')}
                    </>
                )}

                {/* Comments Carousel */}
                <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2">Comments</h4>
                    <div className="relative">
                        <button
                            onClick={prevComment}
                            className="absolute left-0 top-1/2 -translate-y-1/2 p-2"
                        >
                            ←
                        </button>
                        <p className="text-sm text-gray-600 px-8 min-h-[3rem] flex items-center justify-center text-center">
                            {reviews[currentCommentIndex].comments}
                        </p>
                        <button
                            onClick={nextComment}
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                        >
                            →
                        </button>
                    </div>
                    <div className="text-center text-sm text-gray-500 mt-2">
                        {currentCommentIndex + 1} of {reviews.length}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ReviewCard;
