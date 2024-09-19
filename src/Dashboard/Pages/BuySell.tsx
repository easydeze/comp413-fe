import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Input, TextField } from "@mui/material";
import StockSidebar from "../../Buy-Sell/Sidebar";
import { Label } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";


export default function BuySell() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="start">
      <h2>Buy and Sell</h2>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Input placeholder="Enter Ticker Symbol" />
        <Box display="flex" flexDirection="row" alignItems="start">
          <Button>Buy</Button>
          <Button>Sell</Button>
          <Input placeholder="Enter Number of Stocks to buy/sell"></Input>
        </Box>
        <Button onClick={() => (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Order?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to confirm this order? Once initiated, it cannot be undone.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}>View Order</Button>
      </Box>
    </Box>
  );
}
