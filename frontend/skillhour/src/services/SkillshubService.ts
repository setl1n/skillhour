export interface Lesson {
    id: number;
    instructorId: number;
    maxCapacity: number;
    skillTaught: string;
    dateTime: string;
    endDateTime: string;
    isOnline: boolean;
    location: string;
    studentIds: number[];
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
        return response.json();
    }

    public async getLessonById(id: number): Promise<Lesson> {
        const response = await fetch(`${this.baseUrl}/lessons/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch lesson');
        }
        return response.json();
    }
}

export const skillshubService = SkillshubService.getInstance();
export default skillshubService;
