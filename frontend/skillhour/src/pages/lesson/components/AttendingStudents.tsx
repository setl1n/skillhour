import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userService, { User , StudentReview } from '../../../services/UserService';
import { RootState } from '../../../store/store';
import { addReviewedStudent } from '../../../store/lesson/lessonSlice';
import StudentReviewModal from './StudentReviewModal';
import { updateTimeCredits } from '../../../store/auth/authSlice';
import { toast } from 'react-toastify';

interface AttendingStudentsProps {
    studentIds: number[];
    lessonState: 'FUTURE' | 'IN_PROGRESS' | 'ENDED';
}

const AttendingStudents = ({ studentIds, lessonState }: AttendingStudentsProps) => {
    const dispatch = useDispatch();
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);
    const currentLesson = useSelector((state: RootState) => state.lesson.currentLesson);
    const isInstructor = user?.id && currentLesson?.instructorId === parseInt(user.id);

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

    const refreshStudentData = async (studentId: string) => {
        try {
            const updatedStudent = await userService.getUser(studentId);
            setStudents(prevStudents => 
                prevStudents.map(student => 
                    student.id === studentId ? updatedStudent : student
                )
            );
        } catch (error) {
            console.error('Failed to refresh student data:', error);
        }
    };

    const handleReviewSubmitted = async (studentId: string) => {
        dispatch(addReviewedStudent(Number(studentId)));
        await refreshStudentData(studentId);
        
        if (currentLesson && user) {
            try {
                const response = await fetch(`http://localhost:8081/api/lessons/${currentLesson.id}/check-reviews`, {
                    method: 'POST'
                });
                const result = await response.json();
                
                switch(result.status) {
                    case 'rewarded':
                        dispatch(updateTimeCredits(user.timeCred + result.amount));
                        toast.success(
                            `All students reviewed! You earned ${result.amount} TimeCreds 🎉`, 
                            { autoClose: 3000 }
                        );
                        break;
                    case 'already_rewarded':
                        toast.info('All students already reviewed for this lesson');
                        break;
                    case 'pending':
                        toast.info(
                            `Progress: ${result.reviewedCount}/${result.totalStudents} students reviewed`
                        );
                        break;
                }
            } catch (error) {
                console.error('Failed to check reviews status:', error);
                toast.error('Failed to process review completion');
            }
        }
        
        setSelectedStudent(null);
    };

    return (
        <div className="bg-surface/30 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Attending Students</h2>
            <div className="space-y-3 overflow-y-auto h-80">
                {loading ? (
                    <p className="text-text/60">Loading students...</p>
                ) : students.length === 0 ? (
                    <p className="text-text/60">No students enrolled yet</p>
                ) : (
                    students.map((student) => {
                        const averageRating = calculateAverageRating(student.studentReviews || []);
                        const hasBeenReviewed = currentLesson?.reviewedStudents.includes(Number(student.id));
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
                                {isInstructor && lessonState === 'ENDED' && !hasBeenReviewed && (
                                    <button
                                        onClick={() => setSelectedStudent(student)}
                                        className="px-3 py-1 text-sm bg-primary text-white rounded-md 
                                                 hover:bg-primary/90 transition-colors"
                                    >
                                        Review Student
                                    </button>
                                )}
                                {isInstructor && hasBeenReviewed && (
                                    <span className="text-sm text-green-500">
                                        ✓ Reviewed
                                    </span>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            {selectedStudent && currentLesson && (
                <StudentReviewModal
                    isOpen={!!selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    student={selectedStudent}
                    lessonId={currentLesson.id.toString()}
                    onSubmitSuccess={handleReviewSubmitted}
                />
            )}
        </div>
    );
};

export default AttendingStudents;
