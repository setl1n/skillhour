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
    name: string;
    email: string;
    token: string;
}

class UserService {
    private baseUrl: string;
    private static instance: UserService;

    private constructor() {
        this.baseUrl = 'http://localhost:8080/api';
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
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
}

export const userService = UserService.getInstance();
export default userService;
