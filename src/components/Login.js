import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "./AuthService";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
        
    
    setOpenSnackbar(false);
    
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          console.log(error);
          setOpenSnackbar(true);
          
          
        }
      );
    } catch (err) {
      console.log(err);
      
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        
        
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose} ><Alert severity="error">Login not succesfull</Alert></Snackbar>
        
        
        
      </form>
    </div>
  );
};

export default Login;