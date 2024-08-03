import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  deleteTeacher,
  addTeacher,
} from "../app/teacher/teacherSlice";
import Dashboard from "./Dashboard";
import { Input, TextField } from "@mui/material";

const Teachers = () => {
  const { loading, teachers, error } = useSelector((state) => state.teacher);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTeacher({
        title,
        completed: false,
      })
    );
    setTitle("");
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTeacher(id));
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Dashboard />
      <div
        style={{
          paddingTop: "100px",
          paddingLeft: "50px",
        }}>
        <div>
          <form onSubmit={handleSubmit} className="form_cl">
            <TextField
              required
              variant="outlined"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="Add">
              Add
            </button>
          </form>
        </div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {teachers.length > 0 && (
          <ol>
            {teachers.map((teacher) => (
              <li key={teacher.id} className="tr">
                <p>{teacher.title}</p>
                <button
                  className="Delete"
                  onClick={() => handleDelete(teacher.id)}>
                  Delete
                </button>
                <button className="Update">Edit</button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default Teachers;
