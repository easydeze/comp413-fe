
import { Button, Dialog, DialogTitle, Input, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { buyHttp, sellHttp, getMarketPriceHttp, Order } from "../../API/Dashboard/BuySelllAPI"
import { wait } from "@testing-library/user-event/dist/utils";

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

  //STATES
  const [isPreviewShown, setIsPreviewShown] = React.useState(false);
  const [mode, setMode] = React.useState("NONE");
  const [ticker, setTicker] = React.useState('');
  const [numStocks, setStockAmount] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(0);
  const [isOrderModalShown, setIsModalShown] = React.useState(false);

  let marketPrice = 0;

  const handleBuyClick = () => {
    setMode("BUY");
  };

  const handleSellClick = () => {
    setMode("SELL");
  };

  const handleTickerChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTicker(event.target.value);
    // getMarketPriceHttp(ticker).then((r) => {
    //   if (typeof r == 'number') {
    //     marketPrice = r;
    //   } else {
    //     marketPrice = 0;
    //   }
    // })
  }

  const handleLimitPriceChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLimitPrice(Number(event.target.value));
  }

  const handleConfirmClick = () => {
    if (ticker !== "" && numStocks !== 0 && mode !== "NONE" && limitPrice !== 0) {
      setIsPreviewShown(true);
    } else {

      // alert("Enter all required fields.")
      // <Dialog open={true}>
      //   <DialogTitle>
      //     {"Enter all the missing fields!"}
      //   </DialogTitle>
      // </Dialog>
    }

  };


  const handleReset = () => {
    //Erase the input of the input elements
    const inputTickerSymbol = document.getElementById("input-tickerSymbol")
    if (inputTickerSymbol) {
      inputTickerSymbol.nodeValue = null;
    }

    const inputLimitPrice = document.getElementById("input-limit-price");
    if (inputLimitPrice) {
      inputLimitPrice.nodeValue = null;
    }

    const inputBuyStockAmount = document.getElementById("input-buy-stock-amount");
    if (inputBuyStockAmount) {
      inputBuyStockAmount.textContent = "";
      inputBuyStockAmount.hidden = true;
    }

    const inputSellStockAmount = document.getElementById("input-sell-stock-amount");
    if (inputSellStockAmount) {
      inputSellStockAmount.textContent = ""
      inputSellStockAmount.hidden = true;
    }


    //Reset the states
    setIsPreviewShown(false);
    setLimitPrice(0);
    setMode("NONE");
    setStockAmount(0);
    setTicker("");
    setIsModalShown(false);
  }

  const handleMakeOrder = async () => {
    console.log("Make Order ran");

    try {

      //Create the newOrder of the buy/sell order request
      const newOrder: Order = {
        symbol: ticker,
        quantity: numStocks,
        price: limitPrice,
        timeStamp : Date()
      }

      //Request the order
      if (mode === "BUY") {
        const response = await buyHttp(newOrder);

        if (response && response.token) {
          finishOrder(handleClose);
        } else {
          alert("Buy Order was unsuccessful");
        }
      }
      else if (mode === "SELL") {
        const response = await sellHttp(newOrder);

        if (response && response.token) {
          finishOrder(handleClose);
        } else {
          alert("Sell Order was unsuccessful");
        }
      }

      wait(5);
      setIsModalShown(false);


    } catch (error: any) {

      alert("Order was unsuccessful. Please try again.")

    }

    setIsModalShown(true);

    wait(5);

    setIsModalShown(false);


    console.log("Order attempt completed.")
  }

  const handleStockNumberChange = (event: { target: { value: string; }; }) => {
    const result = event.target.value.replace(/\D/g, '');

    setStockAmount(Number(result));
  };

  const handleClose = () => setIsPreviewShown(false);


  return (
    <Box display="flex" flexDirection="column" alignItems="start">
      <h2>Buy and Sell</h2>
      <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
        <p>As of {Date()}</p>
        <Box display="flex" flexDirection="row" alignItems="start" gap={1}>
          <h3>Ticker: </h3>
          <Input id="input-ticker-symbol" onChange={handleTickerChange} placeholder="Enter Ticker Symbol" />
        </Box>

        <Box display="flex" flexDirection="row" alignItems="start" gap={1}>
          <Button onClick={handleBuyClick}>Buy</Button>
          {
            mode === "BUY" && (
              <Input id="input-buy-stock-amount" onChange={handleStockNumberChange} placeholder="Buy #"></Input>
            )
          }
          <Button onClick={handleSellClick}>Sell</Button>
          {
            mode === "SELL" && (
              <Input id="input-sell-stock-amount" onChange={handleStockNumberChange} placeholder="Sell #"  ></Input>
            )
          }

        </Box>
        <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
          {/* <h3>Market Price: {marketPrice}</h3> */}
          <Box display="flex" flexDirection="row" alignItems="start" textAlign="center" gap={1}>
            <h3>Limit Price: </h3>
            <Input id="input-limit-price" onChange={handleLimitPriceChange} placeholder="Enter Desired Price" />
          </Box>
        </Box>


        <Button variant="contained" onClick={handleConfirmClick}>Preview Order</Button>
        <Button variant="contained" onClick={handleReset}>Reset</Button>
        {/* TODO:: Make this a DIALOG */}
        <Modal
          open={isPreviewShown}
          onClose={handleClose}
          id="preview-order-modal"
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
            <Typography id="modal-modal-descr-limitPrice" sx={{ mt: 2 }}>
              Limit Price: ${limitPrice}
            </Typography>
            {/* <Typography id="modal-modal-descr-marketPrice" sx={{ mt: 2 }}>
              Total Price: ${Number(limitPrice) * Number(numStocks)}
            </Typography> */}
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

type closeHandler = () => void;

function finishOrder(closer: closeHandler) {
  closer();

  var open = true;

  //Close the dialog box
  const dialog = <Dialog
    open={open}
  >
    <DialogTitle>
      {"Order was Successfully Created!"}
    </DialogTitle>
  </Dialog>

  wait(5)

  dialog.props.open  = false;

  //Go to positions page
}