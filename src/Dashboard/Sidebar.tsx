import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import ExitToAppIcon for logout
import Typography from "@mui/material/Typography"; // Import Typography

interface SidebarProps {
  open: boolean;
  handleView: (view: string) => void;
  toggleSidebar: (open: boolean) => void;
  handleLogout: () => void; // Add handleLogout prop function
  username: string; // Add username prop
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  handleView,
  toggleSidebar,
  handleLogout,
  username, 
}) => {
  function clickIcon(text: string) {
    if (text === "Logout") {
      handleLogout(); // Call handleLogout when Logout is clicked
      toggleSidebar(false);
    } else {
      handleView(text);
      toggleSidebar(false);
    }
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography variant="h6" style={{ padding: '16px', marginBottom: '-10px', textAlign: 'center' }}>
        Welcome, {username}!
      </Typography>
      <List>
        {["Home", "Activity", "Buy and Sell", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => clickIcon(text)}>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <ShowChartIcon />
                ) : index === 2 ? (
                  <BarChartIcon />
                ) : (
                  <ExitToAppIcon /> // Logout icon
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={() => toggleSidebar(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
