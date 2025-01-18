import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Lesson, skillshubService } from '../../services/SkillshubService';

interface LessonState {
    lessons: Lesson[];
    currentLesson: Lesson | null;
    loading: boolean;
    error: string | null;
}

const initialState: LessonState = {
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null
};

export const fetchLessons = createAsyncThunk(
    'lesson/fetchLessons',
    async () => {
        return await skillshubService.getAllLessons();
    }
);

export const createLesson = createAsyncThunk(
    'lesson/createLesson',
    async (lesson: Omit<Lesson, 'id'>) => {
        return await skillshubService.createLesson(lesson);
    }
);

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
            state.currentLesson = action.payload;
        },
        updateLessonState: (state, action: PayloadAction<'UPCOMING' | 'IN_PROGRESS' | 'ENDED'>) => {
            if (state.currentLesson) {
                state.currentLesson.state = action.payload;
            }
        },
        addReviewedStudent: (state, action: PayloadAction<number>) => {
            if (state.currentLesson) {
                state.currentLesson.reviewedStudents.push(action.payload);
            }
        },
        addTeacherReviewer: (state, action: PayloadAction<number>) => {
            if (state.currentLesson) {
                state.currentLesson.teacherReviewers.push(action.payload);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.loading = false;
                state.lessons = action.payload;
                state.error = null;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch lessons';
            })
            .addCase(createLesson.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLesson.fulfilled, (state, action) => {
                state.loading = false;
                state.lessons.push(action.payload);
                state.error = null;
            })
            .addCase(createLesson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create lesson';
            });
    }
});

export const { 
    setCurrentLesson, 
    updateLessonState, 
    addReviewedStudent, 
    addTeacherReviewer 
} = lessonSlice.actions;

export default lessonSlice.reducer;
