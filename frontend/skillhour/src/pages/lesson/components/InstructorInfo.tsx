import { useEffect, useState } from 'react';
import userService, { Reviews } from '../../../services/UserService';
import Card from '../../../components/Card';
import ReviewCard from '../../profile/components/ReviewCard';
import { Lesson } from '../../../services/SkillshubService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import TeacherReviewModal from './TeacherReviewModal';
import { addTeacherReviewer } from '../../../store/lesson/lessonSlice';
import { TeacherReview } from '../../../services/UserService';
import ViewProfile from '../../../components/ViewProfile';

interface InstructorInfoProps {
    lesson: Lesson;
}

const InstructorInfo = ({ lesson }: InstructorInfoProps) => {
    const [teacherReviews, setTeacherReviews] = useState<Reviews['teacherReviews']>([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (lesson.instructor?.id) {
            userService.getUserReviews(lesson.instructor.id.toString())
                .then(({ teacherReviews }) => setTeacherReviews(teacherReviews))
                .catch(err => console.error('Error fetching teacher reviews:', err));
        }
    }, [lesson.instructor?.id]);

    const isStudentOfLesson = user && lesson.studentIds.includes(Number(user.id));
    const hasReviewedTeacher = lesson.teacherReviewers.includes(Number(user?.id));
    const canReviewInstructor = isStudentOfLesson && lesson.state === 'ENDED' && !hasReviewedTeacher;

    const handleReviewSubmitted = (newReview: TeacherReview) => {
        setTeacherReviews(prev => [...prev, newReview]);
        dispatch(addTeacherReviewer(Number(user?.id)));
    };

    if (!lesson.instructor) {
        return null;
    }

    return (
        <Card className="bg-surface/30 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <ViewProfile userId={lesson.instructor.id.toString()}>
                    <div className="flex items-center gap-4 hover:bg-surface/50 p-2 rounded-lg transition-colors">
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={`https://loremfaces.net/96/id/${lesson.instructor.id}.jpg`}
                            alt="Instructor"
                        />
                        <span className="font-medium">
                            {lesson.instructor.username}
                        </span>
                    </div>
                </ViewProfile>
                {canReviewInstructor && (
                    <button
                        onClick={() => setShowReviewModal(true)}
                        className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Review Instructor
                    </button>
                )}
                {hasReviewedTeacher && (
                    <span className="text-sm text-green-500 block mt-2">
                        ✓ Instructor Reviewed
                    </span>
                )}
            </div>
            <h3 className="text-lg font-medium mb-2">Teacher Reviews</h3>
            <ReviewCard type="teacher" reviews={teacherReviews} />
            <TeacherReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                instructor={lesson.instructor}
                lessonId={lesson.id.toString()}
                onSubmitSuccess={handleReviewSubmitted}
            />
        </Card>
    );
};

export default InstructorInfo;
