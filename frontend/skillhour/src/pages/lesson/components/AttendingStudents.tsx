import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userService, { User } from '../../../services/UserService';
import { RootState } from '../../../store/store';
import StudentReviewModal from './StudentReviewModal';

interface AttendingStudentsProps {
    studentIds: number[];
    lessonState: 'FUTURE' | 'IN_PROGRESS' | 'ENDED';
}

const AttendingStudents = ({ studentIds, lessonState }: AttendingStudentsProps) => {
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const currentLesson = useSelector((state: RootState) => state.lesson.currentLesson);
    const isInstructor = user && currentLesson?.instructorId === Number(user.id);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const studentPromises = studentIds.map(id => userService.getUser("" + id));
                const fetchedStudents = await Promise.all(studentPromises);
                setStudents(fetchedStudents);
            } catch (error) {
                console.error('Failed to fetch students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [studentIds]);

    const calculateAverageRating = (reviews: StudentReview[]) => {
        if (reviews.length === 0) return null;
        const totalScore = reviews.reduce((sum, review) => sum + review.overallScore, 0);
        return totalScore / reviews.length;
    };

    const handleReviewStudent = async (studentId: string) => {
        // TODO: Implement review confirmation logic
        console.log('Reviewing student:', studentId);
    };

    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Attending Students</h2>
            <div className="space-y-3">
                {loading ? (
                    <p className="text-text/60">Loading students...</p>
                ) : students.length === 0 ? (
                    <p className="text-text/60">No students enrolled yet</p>
                ) : (
                    students.map((student) => {
                        const averageRating = calculateAverageRating(student.studentReviews || []);
                        return (
                            <div 
                                key={student.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-surface/50"
                            >
                                <img 
                                    src={`https://loremfaces.net/96/id/${student.id}.jpg`}
                                    alt={student.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-grow">
                                    <div className="font-medium">{student.username}</div>
                                    {averageRating !== null && (
                                        <div className="text-sm text-text/60">
                                            ⭐ {averageRating.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                                {isInstructor && lessonState === 'ENDED' && (
                                    <button
                                        onClick={() => setSelectedStudent(student)}
                                        className="px-3 py-1 text-sm bg-primary text-white rounded-md 
                                                 hover:bg-primary/90 transition-colors"
                                    >
                                        Review Student
                                    </button>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            {selectedStudent && (
                <StudentReviewModal
                    isOpen={!!selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    student={selectedStudent}
                    onConfirm={handleReviewStudent}
                />
            )}
        </div>
    );
};

export default AttendingStudents;
