import React, { useState } from "react";
import { Button, Box, Typography, CircularProgress } from "@mui/material";
import "./login.css";
import { loginHttp } from "../API/Login/LoginAPI";

interface LoginProps {
    toggleLogin: (value: boolean) => void;
    onLogin: (username: string, token: string) => void;
}

const Login: React.FC<LoginProps> = ({ toggleLogin, onLogin }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleLogin = async () => {
        if (username.trim() === "") {
            setError("Username is required");
            return;
        }

        setLoading(true);
        setError(""); 

        try {
            const response = await loginHttp(username);

            if (response && response.token) {
                onLogin(username, response.token);
                toggleLogin(false);
                setError("");
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (error: any) {
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLogin();
        }
    };

    return !sessionStorage.getItem("token") ? (
        <>
            <main id="login-modal" className="modal">
                <Box className="modal-content">
                    <form
                        onKeyDown={handleKeyDown}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                    >
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
                                disabled={loading}
                            />

                            {error && <Typography color="error">{error}</Typography>}
                        </div>
                        <div className="button-container">
                            <Button
                                id="login-button"
                                onClick={handleLogin}
                                disabled={!username.trim() || loading}
                            >
                                {loading ? <CircularProgress size={24} /> : "Login"}
                            </Button>
                        </div>
                    </form>
                </Box>
            </main>
        </>
    ) : (
        <></>
    );
};

export default Login;