import { useEffect, useState } from 'react';
import userService, { Reviews } from '../../../services/UserService';
import Card from '../../../components/Card';
import ReviewCard from '../../profile/components/ReviewCard';
import { Lesson } from '../../../services/SkillshubService';

interface InstructorInfoProps {
    lesson: Lesson;
}

const InstructorInfo = ({ lesson }: InstructorInfoProps) => {
    const [teacherReviews, setTeacherReviews] = useState<Reviews['teacherReviews']>([]);

    useEffect(() => {
        if (lesson.instructor?.id) {
            userService.getUserReviews(lesson.instructor.id.toString())
                .then(({ teacherReviews }) => setTeacherReviews(teacherReviews))
                .catch(err => console.error('Error fetching teacher reviews:', err));
        }
    }, [lesson.instructor?.id]);

    if (!lesson.instructor) {
        return null;
    }

    return (
        <Card className="bg-surface/30 p-4 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Instructor Info</h2>
            <div className="flex items-center gap-4 mb-4">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={`https://loremfaces.net/96/id/${lesson.instructor.id}.jpg`}
                    alt="Instructor"
                />
                <span className="font-medium">
                    {lesson.instructor.username}
                </span>
            </div>
            <h3 className="text-lg font-medium mb-2">Teacher Reviews</h3>
            <ReviewCard type="teacher" reviews={teacherReviews} />
        </Card>
    );
};

export default InstructorInfo;
