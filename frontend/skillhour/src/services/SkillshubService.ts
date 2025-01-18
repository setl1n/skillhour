import userService, { User } from "./UserService";

export interface Lesson {
    id: number;
    instructorId: number;
    instructor?: User;  // Replace instructorName with instructor object
    maxCapacity: number;
    skillTaught: string;
    dateTime: string;
    endDateTime: string;
    isOnline: boolean;
    location: string;
    studentIds: number[];
    state: 'UPCOMING' | 'IN_PROGRESS' | 'ENDED';
    reviewedStudents: number[];    // IDs of students who have been reviewed
    teacherReviewers: number[];    // IDs of students who have reviewed the teacher
}

class SkillshubService {
    private baseUrl: string;
    private static instance: SkillshubService;

    private constructor() {
        this.baseUrl = 'http://localhost:8081/api';
    }

    public static getInstance(): SkillshubService {
        if (!SkillshubService.instance) {
            SkillshubService.instance = new SkillshubService();
        }
        return SkillshubService.instance;
    }

    public async getAllLessons(): Promise<Lesson[]> {
        const response = await fetch(`${this.baseUrl}/lessons`);
        if (!response.ok) {
            throw new Error('Failed to fetch lessons');
        }
        const lessons: Lesson[] = await response.json();
        // Fetch all instructor details in parallel
        const enhancedLessons = await Promise.all(
            lessons.map(async (lesson) => {
                const instructor = await userService.getUser(String(lesson.instructorId));
                return {
                    ...lesson,
                    instructor
                };
            })
        );
        return enhancedLessons;
    }

    public async getLessonById(id: number): Promise<Lesson> {
        const response = await fetch(`${this.baseUrl}/lessons/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch lesson');
        }
        const lesson: Lesson = await response.json();
        // Fetch instructor details and enhance lesson object
        const instructor = await userService.getUser(String(lesson.instructorId));
        return {
            ...lesson,
            instructor
        };
    }

    public async updateLessonState(lessonId: number, state: 'UPCOMING' | 'IN_PROGRESS' | 'ENDED'): Promise<Lesson> {
        const response = await fetch(`${this.baseUrl}/lessons/${lessonId}/state/${state}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Failed to update lesson state');
        }
        const lesson: Lesson = await response.json();
        const instructor = await userService.getUser(String(lesson.instructorId));
        return {
            ...lesson,
            instructor
        };
    }
}

export const skillshubService = SkillshubService.getInstance();
export default skillshubService;
