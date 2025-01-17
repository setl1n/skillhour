import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import lessonReducer from './lesson/lessonSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        lesson: lessonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
