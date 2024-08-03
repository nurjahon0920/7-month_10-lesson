import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const res = await axios.get("http://localhost:3000/teachers");
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const addTeacher = createAsyncThunk(
  "teachers/addTeacher",
  async (teacher) => {
    try {
      const res = await axios.post("http://localhost:3000/teachers", teacher);
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteTeacher = createAsyncThunk(
  "teachers/deleteTeacher",
  async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/teachers/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const updateTeacher = createAsyncThunk(
  "teachers/updateTeacher",
  async (teacher) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/teachers/${teacher.id}`,
        teacher
      );
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
const initialState = {
  loading: false,
  teachers: [],
  error: "",
};
const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    search: (state) => {},
  },
  extraReducers: (builder) => {
    // fetchTeachers
    builder.addCase(fetchTeachers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.loading = false;
      state.teachers = [];
      state.error = action.payload;
    });
    //    addTeacher
    builder.addCase(addTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = [...state.teachers, action.payload];
      state.error = "";
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //    deleteTeacher
    builder.addCase(deleteTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload.id
      );
      state.error = "";
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //    updateTeacher
    builder.addCase(updateTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.teachers = state.teachers.map((teacher) =>
        teacher.id === action.payload.id ? action.payload : teacher
      );
      state.error = "";
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const teacherReducer = teacherSlice.reducer;
export const teacherActions = teacherSlice.actions;
