import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { log } from "console";


export default function BuySell() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  console

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
        <Button>View Order</Button>
      </Box>
    </Box>
  );
}

function showComfirmation() {
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => log("Confirmation of Order Completed")}>
        <DialogTitle>
          {"Confirm Order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once the order is placed, nothing can stop it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
