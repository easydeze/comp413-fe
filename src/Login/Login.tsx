import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

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
          }

          .modal-content {
            display: flex;
            flex-direction: column;
            position: absolute;
            align-items: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 5%;
            width: 25%;
            background-color: #fff;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            gap: 10px;
            text-align: center;
          }

          #login {
            font-size: 2rem;
            margin-bottom: 10px;
          }

          .input-container {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }

          input {
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            max-width: 200px;
          }

          #login-button {
            font-size: 1.5rem;
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
                  setError(""); // Clear error when username is valid
                }
              }}
              required
            />
          </div>
          {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
          <Button
            id="login-button"
            onClick={handleLogin}
            disabled={!username.trim()} // Disable button if username is empty
          >
            Login
          </Button>
        </Box>
      </main>
    </>
  );
};

export default Login;