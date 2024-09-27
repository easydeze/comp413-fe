import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Modal, Typography } from "@mui/material";
import { Box, style } from "@mui/system";
import { OrderDialog } from "../../Buy-Sell/Search";
import React from "react";
import { log } from "console";


export default function BuySell() {
  const [isShown, setIsShown] = React.useState(false);
  const [mode, setMode] = React.useState("NONE");

  const handleBuyClick = () => {
    setMode("BUY");
    setIsShown(true);
  };

  const handleSellClick = () => {
    setMode("SELL");
    setIsShown(true);
  };

  const handleConfirmClick = () => {
    setIsShown(true);
  };

  const handleClose = () => setIsShown(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="start">
      <h2>Buy and Sell</h2>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Input placeholder="Enter Ticker Symbol" />
        <Box display="flex" flexDirection="row" alignItems="start">
          <Button onClick={handleBuyClick}>Buy</Button>
          {
            isShown && (
              <Input placeholder="Buy #"></Input>
            )
          }
          <Button onClick={handleSellClick}>Sell</Button>
          {
            !isShown && (
              <Input placeholder="Sell #"></Input>
            )
          }

        </Box>
        <Button onClick={handleConfirmClick}>View Order</Button>
        <Modal
          open={isShown}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Order Summary
            </Typography>
            <Typography id="modal-modal-descr-mode" sx={{ mt: 2 }}>
              Order Mode: {mode}
            </Typography>
            <Typography id="modal-modal-descr-total" sx={{ mt: 2 }}>
              Total Number of Stocks: {1}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

// function showComfirmation() {


//   const handleClose = () => {
//   }

//   return (
//     <React.Fragment>
//       <Dialog open={true} onClose={() => log("Confirmation of Order Completed")}>
//         <DialogTitle>
//           {"Confirm Order?"}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Once the order is placed, nothing can stop it.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleClose} autoFocus>Agree</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   )
// }
