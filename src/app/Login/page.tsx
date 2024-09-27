'use client'

import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

// interface LoginProps {
//     toggleLogin: (value: boolean) => void;
//     onLogin: (username: string) => void; // Add onLogin prop
// }

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState(""); // State for error message

    const handleLogin = () => {
        if (username.trim() === "") {
            setError("Username is required"); // Set error message if username is empty
            return;
        }
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
                                    setError(""); // Clear error when username is valid
                                }
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && username.trim() !== "") {
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
