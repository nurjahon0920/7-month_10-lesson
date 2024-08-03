import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const res = await axios.get("http://localhost:3000/students");
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    try {
      const res = await axios.post("http://localhost:3000/students", student);
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/students/${id}`);
      const data = await res.data;
      return data;
    } catch (err) {
      return err.message;
    }
  }
);
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (student) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/students/${student.id}`,
        student
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
  students: [],
  error: "",
};
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    search: (state) => {},
  },
  extraReducers: (builder) => {
    // fetchStudents
    builder.addCase(fetchStudents.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.loading = false;
      state.students = action.payload;
      state.error = "";
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.loading = false;
      state.students = [];
      state.error = action.payload;
    });
    //    addStudent
    builder.addCase(addStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.students = [...state.students, action.payload];
      state.error = "";
    });
    builder.addCase(addStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //    deleteStudent
    builder.addCase(deleteStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.students = state.students.filter(
        (student) => student.id !== action.payload.id
      );
      state.error = "";
    });
    builder.addCase(deleteStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //    updateStudent
    builder.addCase(updateStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
      state.error = "";
    });
    builder.addCase(updateStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const studentReducer = studentSlice.reducer;
export const studentActions = studentSlice.actions;
