import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  addStudent,
  updateStudent,
} from "../app/student/studentSlice"; // E'tibor bering, bu import yo'li o'zgargan
import Dashboard from "./Dashboard";
import { Box, Button, Modal, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Students = () => {
  const { loading, students, error } = useSelector((state) => state.students); // E'tibor bering, bu yerda 'students' ishlatilmoqda
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFirstName("");
    setLastName("");
    setGroup("");
    setEditStudentId(null);
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateStudent({ id: editStudentId, group, firstName, lastName })
      );
    } else {
      dispatch(
        addStudent({
          group,
          firstName,
          lastName,
        })
      );
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEdit = (student) => {
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setGroup(student.group);
    setEditStudentId(student.id);
    setIsEditing(true);
    handleOpen();
  };

  const filteredStudents = (students || []).filter(
    (student) =>
      student.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(search.toLowerCase()) ||
      student.group.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <Dashboard />
      <div style={{ paddingTop: "100px", paddingLeft: "50px" }}>
        <div>
          <TextField
            variant="outlined"
            label="Search..."
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
            aria-labelledby="modal-title"
            aria-describedby="modal-description">
            <Box sx={style}>
              <form onSubmit={handleSubmit} className="form_cl">
                <TextField
                  required
                  variant="outlined"
                  label="First Name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  variant="outlined"
                  label="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  required
                  variant="outlined"
                  label="Group"
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" className="Add">
                  {isEditing ? "Update" : "Add"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
        {loading && <div className="loader">Loading...</div>}
        {error && <h2>{error}</h2>}
        {filteredStudents.length > 0 && (
          <ol>
            {filteredStudents.map((student) => (
              <li key={student.id} className="tr">
                <p>{student.firstName}</p>
                <p>{student.lastName}</p>
                <p className="gr">{student.group}</p>
                <button
                  className="Delete"
                  onClick={() => handleDelete(student.id)}>
                  Delete
                </button>
                <button className="Update" onClick={() => handleEdit(student)}>
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

export default Students;
