// src/redux/postingCourseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
  category: '',
  level: '',
  language: '',
  duration: '',
  thumbnail: '',
  instructorName: '',
  bio: '',
  profilePicture: '',
};

const postingCourseSlice = createSlice({
  name: 'postingCourse',
  initialState,
  reducers: {
    setCourseData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetCourseData: () => initialState
  }
});

export const { setCourseData, resetCourseData } = postingCourseSlice.actions;
export default postingCourseSlice.reducer;
