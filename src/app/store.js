import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from "./Teacher/TeacherSlice"; // Default import
import { studentReducer } from "./student/studentSlice";

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    students: studentReducer,
  },
});

export default store;
