
import { Button, Input, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { getMarketPrice, makeOrder } from "../../Model/BuySell_Model";
import { sendOrderRequest } from "../../Buy-Sell/OrderMethods";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: "white",
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BuySell() {
  const [isShown, setIsShown] = React.useState(false);
  const [mode, setMode] = React.useState("BUY");
  const [ticker, setTicker] = React.useState('');
  const [numStocks, setStockAmount] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(0);
  let marketPrice = 0;


  const handleBuyClick = () => {
    setMode("BUY");
  };

  const handleSellClick = () => {
    setMode("SELL");
  };

  const handleTickerChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTicker(event.target.value);
    getMarketPrice(ticker).then((r) => {
      if (typeof r == 'number') {
        marketPrice = r;
      } else {
        marketPrice = 0;
      }
    })
  }

  const handleLimitPriceChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLimitPrice(Number(event.target.value));
  }

  const handleConfirmClick = () => {
    if (ticker !== "" && numStocks !== 0 && mode !== "NONE" && limitPrice !== 0) {
      setIsShown(true);
    } else {
      alert("Enter all required fields.")
    }

  };

  const handleMakeOrder = () => {
    const order = sendOrderRequest(mode=="BUY", ticker, numStocks, limitPrice);
    console.log("Make Order ran");
    handleClose();
  };

  const handleStockNumberChange = (event: { target: { value: string; }; }) => {
    const result = event.target.value.replace(/\D/g, '');

    setStockAmount(Number(result));
  };

  const handleClose = () => setIsShown(false);

  return (
    <Box display="flex" flexDirection="column" alignItems="start">
      <h2>Buy and Sell</h2>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Box display="flex" flexDirection="row" alignItems="start" textAlign="center">
          <p>Ticker: </p>
          <Input id="stock-ticker" onChange={handleTickerChange} placeholder="Enter Ticker Symbol" />
        </Box>

        <Box display="flex" flexDirection="row" alignItems="start">
          <Button onClick={handleBuyClick}>Buy</Button>
          {
            mode === "BUY" && (
              <Input onChange={handleStockNumberChange} placeholder="Buy #"></Input>
            )
          }
          <Button onClick={handleSellClick}>Sell</Button>
          {
            mode === "SELL" && (
              <Input onChange={handleStockNumberChange} placeholder="Sell #"  ></Input>
            )
          }

        </Box>
        <Box display="flex" flexDirection="row" alignItems="start" textAlign="center">
          <p>Market Price:: {marketPrice}</p>
          <p>Limit Price:: </p>
          <Input id="-desired-market-price" onChange={handleLimitPriceChange} placeholder="Enter Desired Price" />
        </Box>


        <Button variant="contained" onClick={handleConfirmClick}>View Order</Button>
        {/* TODO:: Make this a DIALOG */}
        <Modal
          open={isShown}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Order Summary
            </Typography>
            <Typography id="modal-modal-descr-mode" sx={{ mt: 2 }}>
              Order Mode: {mode}
            </Typography>
            <Typography id="modal-modal-descr-mode" sx={{ mt: 2 }}>
              Ticker: {ticker}
            </Typography>
            <Typography id="modal-modal-descr-totalStocks" sx={{ mt: 2 }}>
              Total Number of Stocks: {numStocks}
            </Typography>
            <Typography id="modal-modal-descr-marketPrice" sx={{ mt: 2 }}>
              Limit Price: ${limitPrice}
            </Typography>
            <Typography id="modal-modal-descr-marketPrice" sx={{ mt: 2 }}>
              Total Price: ${Number(limitPrice) * Number(numStocks)}
            </Typography>
            <Box display="flex" flexDirection="row">
              <Button variant="contained" onClick={handleMakeOrder} autoFocus>Confirm</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
