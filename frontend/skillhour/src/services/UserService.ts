export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: string;
    username: string;
    email: string;
    token: string;
    timeCred: number;
}

export interface TeacherReview {
    id: number;
    overallScore: number;
    knowledgeScore: number;
    deliveryScore: number;
    comments: string;
    givenBy: number;
    user?: User;  // Optional because of @JsonBackReference
}

export interface StudentReview {
    id: number;
    overallScore: number;
    attentiveScore: number;
    participationScore: number;
    comments: string;
    givenBy: number;
    user?: User;  // Optional because of @JsonBackReference
}

export interface User {
    id: string;
    username: string;
    email: string;
    token?: string;
    timeCred: number;
    studentReviews?: StudentReview[];
    teacherReviews?: TeacherReview[];
}

export interface Reviews {
    teacherReviews: TeacherReview[];
    studentReviews: StudentReview[];
}

export interface StudentReviewSubmission {
    overallScore: number;
    attentiveScore: number;
    participationScore: number;
    comments: string;
}

class UserService {
    private baseUrl: string;
    private static instance: UserService;
    private token: string | null = null;

    private constructor() {
        this.baseUrl = 'http://localhost:8080/api';
        // Initialize token from localStorage when service is created
        this.token = localStorage.getItem('token');
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public setToken(token: string | null) {
        this.token = token;
    }

    private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
                    ...options.headers,
                },
            });
            
            const contentType = response.headers.get('content-type');
            const data = contentType?.includes('application/json') 
                ? await response.json()
                : await response.text();
            
            if (!response.ok) {
                throw new Error(typeof data === 'string' ? data : data.message || 'API request failed');
            }

            return data as T;
        } catch (error) {
            throw error instanceof Error ? error : new Error('Network error');
        }
    }

    public async register(credentials: RegisterCredentials): Promise<UserResponse> {
        return this.request<UserResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    public async login(credentials: LoginCredentials): Promise<UserResponse> {
        return this.request<UserResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    public async getUserReviews(userId: string): Promise<Reviews> {
        return this.request<Reviews>(`/users/${userId}/reviews`, {
            method: 'GET',
        });
    }

    public async getUser(userId: string): Promise<User> {
        return this.request<User>(`/users/${userId}`, {
            method: 'GET',
        });
    }

    public async enrollInLesson(userId: string, lessonId: string, cost: number): Promise<void> {
        return this.request<void>(`/users/${userId}/enroll?lessonId=${lessonId}&cost=${cost}`, {
            method: 'POST',
        });
    }

    public async createStudentReview(userId: string, lessonId: string, review: StudentReviewSubmission): Promise<StudentReview> {
        return this.request<StudentReview>(`/reviews/student/${userId}/${lessonId}`, {
            method: 'POST',
            body: JSON.stringify(review),
        });
    }
}

export const userService = UserService.getInstance();
export default userService;
