
import { Button, Dialog, DialogTitle, Input, Modal, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

import { buyHttp, Order } from "../../API/Dashboard/BuyAPI"
import { sellHttp } from "../../API/Dashboard/SellAPI"
import { getMarketPriceHttp, StockMarketPrice } from "../../API/Dashboard/MarketPriceAPI"


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
  const [mode, setMode] = React.useState("buy");
  const [ticker, setTicker] = React.useState('');
  const [numStocks, setStockAmount] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(0);
  const [isOrderModalShown, setIsModalShown] = React.useState(false);
  const [isErrorModalShown, setIsErrorModalShown] = React.useState(false);
  const [errorModalMessage, setErrorModalMessage] = React.useState("");

  let marketPrice = 0;

  const handleBuyClick = () => {
    setMode("buy");

    var buyButton = document.getElementById("buy-button")
    var sellButton = document.getElementById("sell-button")
    if (buyButton && sellButton) {
      buyButton.style.backgroundColor = "blue"
      sellButton.style.backgroundColor = "gray"
    }
  };

  const handleSellClick = () => {
    setMode("sell");

    var buyButton = document.getElementById("buy-button")
    var sellButton = document.getElementById("sell-button")
    if (buyButton && sellButton) {
      sellButton.style.backgroundColor = "blue"
      buyButton.style.backgroundColor = "gray"
    }
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

  const handlePreviewClick = async () => {
    if (ticker !== "" && numStocks !== 0 && limitPrice !== 0) {
      setIsPreviewShown(true);
    } else {
      setErrorModalMessage("Enter the required information")

      setIsErrorModalShown(true)

      await timeout(5000)

      setIsErrorModalShown(false)
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

    const newOrder: Order = {
      symbol: ticker,
      quantity: numStocks,
      price: limitPrice,
      timeStamp: Date()
    }


    try {

      //Request the order
      if (mode === "buy") {
        const response = await buyHttp(newOrder);

        if (response) {
          setIsModalShown(true);

          await timeout(5000)

          setIsModalShown(false);

        } else {
          console.error(response);
        }
      }
      else if (mode === "sell") {
        const response = await sellHttp(newOrder);

        if (response) {
          setIsModalShown(true);

          await timeout(5000)

          setIsModalShown(false);

        } else {
          console.error(response);
        }
      }

    } catch (error: any) {


      setErrorModalMessage("Order was unsuccessful. Please try again.")
      setIsErrorModalShown(true)
      await timeout(3000)
      setIsErrorModalShown(false)

    }

    console.log("Order attempt completed.")
  }

  const handleStockNumberChange = (event: { target: { value: string; }; }) => {
    const result = event.target.value.replace(/\D/g, '');

    setStockAmount(Number(result));
  };

  const handleClose = () => setIsPreviewShown(false);


  return (
    <Stack direction="column" spacing={3}>
      <h2>Buy and Sell</h2>
      <p>As of {Date()}</p>
      <Input id="input-ticker-symbol" onChange={handleTickerChange} placeholder="Enter Ticker Symbol" />


      <Stack direction="row" spacing={2}>
        <Button id="buy-button" variant="contained" onClick={handleBuyClick}>Buy</Button>
        <Button id="sell-button" variant="contained" onClick={handleSellClick}>Sell</Button>
      </Stack>

      <Input id="input-buy-stock-amount" onChange={handleStockNumberChange} placeholder={"Number of stocks to " + mode}></Input>

      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={1}>
          <Input id="input-limit-price" onChange={handleLimitPriceChange} placeholder="Enter Limit Price" />
        </Stack>
        <p>Total For Order: ${numStocks * limitPrice}</p>
      </Stack>


      <Button variant="contained" onClick={handlePreviewClick}>Preview Order</Button>

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
          <Stack direction="row">
            <Button variant="contained" onClick={() => {

              handleClose()

              handleMakeOrder()

            }} autoFocus>Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>

      <Dialog open={isOrderModalShown}>
        <DialogTitle>
          {"Order was Successfully Created!"}
        </DialogTitle>
      </Dialog>

      <Dialog open={isErrorModalShown}>
        <DialogTitle>
          {errorModalMessage}
        </DialogTitle>
      </Dialog>

    </Stack>
  );
}


function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}


