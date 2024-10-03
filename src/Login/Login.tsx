import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import "./login.css";

interface LoginProps {
  toggleLogin: (value: boolean) => void;
  onLogin: (username: string) => void; // Add onLogin prop
}

const Login: React.FC<LoginProps> = ({ toggleLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // State for error message

  const handleLogin = () => {
    if (username.trim() === "") {
      setError("Username is required"); // Set error message if username is empty
      return;
    }
    onLogin(username); // Call the onLogin function
    toggleLogin(false); // Close the login modal
    setError(""); // Clear error on successful login
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
              onKeyPress={(e) => {
                if (e.key === "Enter" && username.trim() !== "") {
                  handleLogin();
                }
              }}
              required
            />
            {error && <Typography color="error">{error}</Typography>}
          </div>
          <div className="button-container">
            <Button
              id="login-button"
              onClick={handleLogin}
              disabled={!username.trim()}
            >
              Login
            </Button>
          </div>
        </Box>
      </main>
    </>
  );
};

export default Login;
