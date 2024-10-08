import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import "./login.css";
import { loginHttp } from "../API/Login/LoginAPI"; // Make sure the import path is correct

interface LoginProps {
  toggleLogin: (value: boolean) => void;
  onLogin: (username: string) => void; // Add onLogin prop
}

const Login: React.FC<LoginProps> = ({ toggleLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required"); // Set error message if fields are empty
      return;
    }

    try {
      const response = await loginHttp(username, password); // Call the loginHttp function with username and password

      // Assuming loginHttp returns a user or some data on success
      if (response) {
        onLogin(username); // Call the onLogin function if login is successful
        toggleLogin(false); // Close the login modal
        setError(""); // Clear error on successful login
      }
    } catch (error: any) {
      setError("Login failed. Please try again."); // Set error message on failure
    }
  };

  return (
      <>
        <main id="login-modal" className="modal">
          <Box className="modal-content">
            <div className="input-container">
              <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setError(""); // Clear error when username is valid
                    }
                  }}
                  required
              />
              <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.trim() !== "") {
                      setError(""); // Clear error when password is valid
                    }
                  }}
                  required
              />
              {error && <Typography color="error">{error}</Typography>}
            </div>
            <div className="button-container">
              <Button id="login-button" onClick={handleLogin} disabled={!username.trim() || !password.trim()}>
                Login
              </Button>
            </div>
          </Box>
        </main>
      </>
  );
};

export default Login;
