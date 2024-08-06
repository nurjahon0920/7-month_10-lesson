import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeachers,
  deleteTeacher,
  addTeacher,
  updateTeacher,
} from "../app/Teacher/TeacherSlice";
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

const Teachers = () => {
  const { loading, Teachers, error } = useSelector((state) => state.teacher);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFirstName("");
    setLastName("");
    setLevel("");
    setEditTeacherId(null);
  };

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateTeacher({ id: editTeacherId, level, firstName, lastName })
      );
    } else {
      dispatch(
        addTeacher({
          level,
          firstName,
          lastName,
        })
      );
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteTeacher(id));
    }
  };

  const handleEdit = (teacher) => {
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setLevel(teacher.level);
    setEditTeacherId(teacher.id);
    setIsEditing(true);
    handleOpen();
  };

  const filteredTeachers = (Teachers || []).filter(
    (teacher) =>
      teacher.firstName.toLowerCase().includes(search.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(search.toLowerCase()) ||
      teacher.level.toLowerCase().includes(search.toLowerCase())
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
                  label="Level"
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
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
        {filteredTeachers.length > 0 && (
          <ol>
            {filteredTeachers.map((teacher) => (
              <li key={teacher.id} className="tr">
                <p>{teacher.firstName}</p>
                <p>{teacher.lastName}</p>
                <p className="gr">{teacher.level}</p>
                <button
                  className="Delete"
                  onClick={() => handleDelete(teacher.id)}>
                  Delete
                </button>
                <button className="Update" onClick={() => handleEdit(teacher)}>
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

export default Teachers;
