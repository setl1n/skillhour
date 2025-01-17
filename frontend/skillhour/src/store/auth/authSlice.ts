import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService, { LoginCredentials, RegisterCredentials, UserResponse, User } from '../../services/UserService';

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

// Load token from localStorage
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
    isAuthenticated: !!storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
};

export const registerAsync = createAsyncThunk<UserResponse, RegisterCredentials>(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await userService.register(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const loginAsync = createAsyncThunk<User, LoginCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await userService.login(credentials);
            const userData: User = {
                id: response.id,
                username: response.username,
                email: response.email,
                token: response.token,
                timeCred: response.timeCred
            };
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = null;
            })
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
