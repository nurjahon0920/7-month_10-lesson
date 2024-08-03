import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  addStudent,
} from "../app/student/studentSlice";
import Dashboard from "./Dashboard";
import {
  Box,
  Button,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const students = () => {
  const { loading, students, error } = useSelector((state) => state.student);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  // const [completed, setCompleted] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addStudent({
        title,
        completed: false,
      })
    );
    setTitle("");
    handleClose();
  };
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteStudent(id));
    }
  };
  const filteredStudents = students.filter((student) =>
    student.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div style={{ display: "flex" }}>
      <Dashboard />
      <div
        style={{
          paddingTop: "100px",
          paddingLeft: "50px",
        }}>
        <div>
          <TextField
            variant="outlined"
            label="Searching..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleOpen} variant="contained">
            Add
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <form onSubmit={handleSubmit} className="form_cl">
                <TextField
                  required
                  variant="outlined"
                  label="Name"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button type="submit" className="Add">
                  Add
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {filteredStudents.length > 0 && (
          <ol>
            {filteredStudents.map((student) => (
              <li key={student.id} className="tr">
                <p>{student.title}</p>
                <button
                  className="Delete"
                  onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
                <button className="Update" onClick={handleOpen}>
                  Edit
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default students;
