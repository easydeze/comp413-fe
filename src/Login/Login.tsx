import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

interface LoginProps {
  toggleLogin: (value: boolean) => void;
  onLogin: (username: string, password: string) => void; // Update onLogin prop to include password
}

const Login: React.FC<LoginProps> = ({ toggleLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for general error message
  const [usernameError, setUsernameError] = useState(""); // State for username error message
  const [passwordError, setPasswordError] = useState(""); // State for password error message

  const handleLogin = () => {
    // Validate username
    if (username.trim() === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }

    // Validate password
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    // If both fields are valid, proceed with login
    if (username.trim() !== "" && password.trim() !== "") {
      onLogin(username, password); // Call the onLogin function
      toggleLogin(false); // Close the login modal
      setUsername(""); // Clear username input
      setPassword(""); // Clear password input
      setUsernameError(""); // Clear username error
      setPasswordError(""); // Clear password error
      setError(""); // Clear general error
    }
  };

  return (
    <>
      <style>
        {`
          .modal {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .modal-content {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background-color: white;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            width: 400px;
            gap: 20px;
          }

          .input-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          input {
            padding: 10px;
            font-size: 1rem;
            border: none; /* Remove border */
            border-radius: 5px;
            background-color: #ffffff; /* Light gray background */
            width: 100%;
            max-width: 300px;
            outline: none; /* Remove outline */
          }

          .button-container {
            display: flex;
            justify-content: flex-end;
          }

          #login-button {
            font-size: 1.2rem;
            padding: 8px 8px;
          }

          #login-button:hover {
            color: #38778b;
          }
        `}
      </style>

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
                  setUsernameError(""); // Clear username error when username is valid
                }
              }}
              required
            />
            {usernameError && <Typography color="error">{usernameError}</Typography>}
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.trim() !== "") {
                  setPasswordError(""); // Clear password error when password is valid
                }
              }}
              required
            />
            {passwordError && <Typography color="error">{passwordError}</Typography>}
          </div>
          <div className="button-container">
            <Button
              id="login-button"
              onClick={handleLogin}
              disabled={!username.trim() || !password.trim()}
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
