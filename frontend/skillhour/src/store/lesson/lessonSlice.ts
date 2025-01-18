import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lesson } from '../../services/SkillshubService';

interface LessonState {
    currentLesson: Lesson | null;
}

const initialState: LessonState = {
    currentLesson: null
};

const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
            state.currentLesson = action.payload;
        },
        updateLessonState: (state, action: PayloadAction<'FUTURE' | 'IN_PROGRESS' | 'ENDED'>) => {
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
    }
});

export const { 
    setCurrentLesson, 
    updateLessonState, 
    addReviewedStudent, 
    addTeacherReviewer 
} = lessonSlice.actions;

export default lessonSlice.reducer;
