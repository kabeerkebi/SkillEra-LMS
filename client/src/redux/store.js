// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import postingCourseReducer from "./postingCourseSlice";

const store = configureStore({
  reducer: {
    postingCourse: postingCourseReducer,
  },
});

export default store;
