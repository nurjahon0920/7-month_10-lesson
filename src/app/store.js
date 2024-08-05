import { configureStore } from "@reduxjs/toolkit";
import { studentReducer } from "./student/studentSlice";
import { teacherReducer } from "./teacher/teacherSlice";

const store = configureStore({
  reducer: {
    teacher: teacherReducer,
    student: studentReducer,
  },
});

export default store;
