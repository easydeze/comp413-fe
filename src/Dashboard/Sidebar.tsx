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

export default function Sidebar({ open, handleView, toggleSidebar }: any) {
  function clickIcon(text: string) {
    handleView(text);
    toggleSidebar(false);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {["Home", "Activity", "Buy and Sell"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => clickIcon(text)}>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index == 1 ? (
                  <ShowChartIcon />
                ) : (
                  <BarChartIcon />
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
}
