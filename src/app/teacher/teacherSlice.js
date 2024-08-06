import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "Teachers/fetchTeachers",
  async () => {
    try {
      const res = await axios.get("http://localhost:3000/Teachers");
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

export const addTeacher = createAsyncThunk(
  "Teachers/addTeacher",
  async (Teacher) => {
    try {
      const res = await axios.post("http://localhost:3000/Teachers", Teacher);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "Teachers/deleteTeacher",
  async (id) => {
    try {
      await axios.delete(`http://localhost:3000/Teachers/${id}`);
      return id;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "Teachers/updateTeacher",
  async (Teacher) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/Teachers/${Teacher.id}`,
        Teacher
      );
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  loading: false,
  Teachers: [],
  error: "",
};

const TeacherSlice = createSlice({
  name: "Teacher",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.loading = false;
      state.Teachers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.loading = false;
      state.Teachers = [];
      state.error = action.error.message;
    });

    builder.addCase(addTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.Teachers = [...state.Teachers, action.payload];
      state.error = "";
    });
    builder.addCase(addTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.Teachers = state.Teachers.filter(
        (Teacher) => Teacher.id !== action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateTeacher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      state.loading = false;
      state.Teachers = state.Teachers.map((Teacher) =>
        Teacher.id === action.payload.id ? action.payload : Teacher
      );
      state.error = "";
    });
    builder.addCase(updateTeacher.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Default eksportni `TeacherReducer` nomi bilan export qilin
export default TeacherSlice.reducer;
export const TeacherActions = TeacherSlice.actions;
