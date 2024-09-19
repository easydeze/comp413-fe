import React from "react";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"; // Import Typography for better text styling

interface HeaderProps {
  toggleSidebar: () => void;
  username: string; // Add username prop
  handleLogout: () => void; // Add handleLogout prop
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, username, handleLogout }) => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
      <Typography variant="h5">OwlFinance</Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {username && (
          <><Typography variant="body1" style={{ marginRight: '10px' }}>
            Welcome, {username}!
          </Typography><Button variant="contained" onClick={handleLogout}
            style={{ marginRight: '10px' }}>
              Logout
            </Button></>
        )}
        <Button
          style={{ marginRight: '10px' }}
          variant="contained"
          onClick={toggleSidebar}
        >
          <ViewHeadlineIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
