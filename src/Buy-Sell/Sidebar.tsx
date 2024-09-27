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
import { Button, Input } from "@mui/material";
import { Label } from "@mui/icons-material";

export default function StockSidebar({ open, handleView, toggleSidebar }: any) {
    function clickIcon(text: string) {
        handleView(text);
        toggleSidebar(false);
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {["Search", "Buy-Sell", "Order"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        {index === 0 ? (
                            <Label>{text}
                            <Input placeholder="Enter ticker symbol" />
                            </Label>

                        ) : index == 1 ? (
                            <div className="flexbox-container">
                                <Button variant="outlined">Buy</Button>
                                <Button variant="outlined">Sell</Button>
                            </div>
                        ) : (
                            <Button variant="contained">{text}</Button>
                        )}
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
