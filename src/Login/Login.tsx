import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import "./login.css";
import { loginHttp } from "../API/Login/LoginAPI";

interface LoginProps {
  toggleLogin: (value: boolean) => void;
  onLogin: (username: string, token: string) => void; // Pass both username and token
}

const Login: React.FC<LoginProps> = ({ toggleLogin, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await loginHttp(username, password);

      if (response && response.token) {
        const { token } = response;
        onLogin(username, token);
        toggleLogin(false);
        setError("");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      setError("Login failed. Please try again.");
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
                  setError("");
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
                  setError("");
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
