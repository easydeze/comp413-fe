import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const LoginButton = () => {
  let navigate = useNavigate();

  // only navigate if api call returns with user data.
  const routeChange = () => {
    navigate("/dashboard");
  };

  return <Button onClick={routeChange}>Login</Button>;
};

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      <LoginButton />
    </>
  );
}
