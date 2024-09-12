import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@mui/material';

const LoginButton = () => {
  let navigate = useNavigate();

  const routeChange = () => {
    navigate('/dashboard');
  };

  return (
    <Button onClick={routeChange}>
      Login
    </Button>
  );
};

export default function Login() {
  let navigate = useNavigate();
  
  const handleGoogleLoginSuccess = (response: any) => {
    console.log("Login Success:", response);
    // You can use the response to authenticate the user and navigate
    // For example, set the token in the local storage
    localStorage.setItem("google_token", response.credential);
    navigate('/dashboard');
  };

  const handleGoogleLoginFailure = () => {
    console.log("Login Failed!");
  };

  return (
    <>
      <h1>Login</h1>
      <LoginButton />
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </>
  );
}