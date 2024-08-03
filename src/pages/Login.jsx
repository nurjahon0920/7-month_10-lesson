import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import "./style.css";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginHandleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
  return (
    <div className="container py-5">
      <form onSubmit={loginHandleSubmit} className="login_form">
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          type="text"
          placeholder="admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="1111"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
