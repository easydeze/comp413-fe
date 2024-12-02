
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

import { Stack } from "@mui/system";
import React from "react";

import { Order } from "../../../API/Dashboard/BuySellAPI"
import { buyHttp } from "../../../API/Dashboard/BuyAPI"
import { sellHttp } from "../../../API/Dashboard/SellAPI"
import { getMarketPriceHttp } from "../../../API/Dashboard/MarketPriceAPI";



const buttonStyle = {
  height: '30px',
}

export default function BuySell() {
  //STATES
  const [isPreviewShown, setIsPreviewShown] = React.useState(false);
  const [isConfirmDisabled, setDisableConfirm] = React.useState(false);
  const [isModalShown, setIsModalShown] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [mode, setMode] = React.useState("");
  const [ticker, setTicker] = React.useState("");
  const [tickerError, setTickerError] = React.useState(false);
  const [numStocks, setStockAmount] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(0);
  const [marketPrice, setMarketPrice] = React.useState(0);

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

  const handleTickerChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTicker(event.target.value);

    setTickerError(false)

    getMarketPriceHttp(ticker).then((r: { marketPrice: React.SetStateAction<number>; }) => {
      console.log("Market Price after change for " + ticker)
      console.log(r.marketPrice)

      if (typeof r.marketPrice == "number") {
        setTickerError(false)
        setMarketPrice(r.marketPrice)
      } else {
        setTickerError(true)
        setMarketPrice(0)
      }
    });


  };

  const handleLimitPriceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLimitPrice(Number(event.target.value));
  };

  const handlePreviewClick = async () => {

    if (ticker !== "" && numStocks !== 0 && limitPrice !== 0) {
      setIsPreviewShown(true);
    }
  };

  const handleReset = () => {
    //Erase the input of the input elements
    const inputTickerSymbol = document.getElementById("input-tickerSymbol");
    if (inputTickerSymbol) {

      inputTickerSymbol.textContent = "";
    }

    const inputLimitPrice = document.getElementById("input-limit-price");
    if (inputLimitPrice) {
      inputLimitPrice.textContent = "";
    }

    const inputBuyStockAmount = document.getElementById(
      "input-buy-stock-amount"
    );
    if (inputBuyStockAmount) {
      inputBuyStockAmount.textContent = "";
      inputBuyStockAmount.hidden = true;
    }

    const inputSellStockAmount = document.getElementById(
      "input-sell-stock-amount"
    );
    if (inputSellStockAmount) {
      inputSellStockAmount.textContent = "";
      inputSellStockAmount.hidden = true;
    }

    //Reset the states
    setIsPreviewShown(false);
    setLimitPrice(0);
    setMode("");
    setStockAmount(0);
    setTicker("");
  };

  const handleMakeOrder = async () => {
    console.log("Make Order ran");

    const newOrder: Order = {
      tickerSymbol: ticker,
      quantity: numStocks,
      limitPrice: limitPrice,
      timestamp: Date()
    }

    setDisableConfirm(true)


    try {

      //Request the order
      var response = mode === "buy" ? await buyHttp(newOrder) : await sellHttp(newOrder);

      if (response) {
        //Close the preview order modal
        handleClose()

        //Show success modal for 5 seconds
        setModalMessage("Order was created successfully!")
        setIsModalShown(true);
        await timeout(5000)
        setIsModalShown(false);

        //Reset the input fields on the page
        //handleReset();


      } else {

        //Set and Show the error message for 5 seconds
        setModalMessage("Order failed to be created. Try again.")
        setIsModalShown(true)
        await timeout(1000)
        setIsModalShown(false);

      }

    } catch (error: any) {

      console.error("ERROR: " + error.message)

      //Set and Show the error message for 5 seconds
      setModalMessage("Order failed to be created. Try again.")
      setIsModalShown(true)
      await timeout(1000)
      setIsModalShown(false);

    } finally {
      setDisableConfirm(false)
    }

    console.log("Order attempt completed.");
  };

  const handleStockNumberChange = (event: { target: { value: string } }) => {
    const result = event.target.value.replace(/\D/g, "");

    setStockAmount(Number(result));
  };

  const handleClose = () => setIsPreviewShown(false);

  return (
    <Stack direction="column" spacing={3}>


      <h1>Buy and Sell Stocks</h1>
      <p>As of {Date()}</p>
      <TextField required id="input-ticker-symbol" label="Ticker Symbol" onChange={handleTickerChange} placeholder="Enter Ticker Symbol" error={tickerError} helperText={tickerError ? "Please enter a ticker symbol" : ""} />


      <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ justifyContent: 'center', alignItems: 'center' }} >
        <Button id="buy-button" variant="contained" fullWidth style={buttonStyle} onClick={handleBuyClick}>Buy</Button>
        <Button id="sell-button" variant="contained" fullWidth style={buttonStyle} onClick={handleSellClick}>Sell</Button>
      </Stack>

      <TextField required id="input-buy-stock-amount" autoComplete="false" label="Stock Amount" onChange={handleStockNumberChange} placeholder={"Number of stocks to " + mode} type="number" />

      <Stack direction="column" spacing={2}>
        <TextField label="Market Price" value={marketPrice!==0 ? marketPrice : "-"}  slotProps={{
            input: {
              readOnly: true,
            },
          }}></TextField>

        <TextField required id="input-limit-price" autoComplete="false" label="Limit Price" onChange={handleLimitPriceChange} placeholder={"Enter Limit Price"} type="number"  fullWidth />

        <h4>Total For Order: ${numStocks * limitPrice}</h4>
      </Stack>


      <Button
        variant="contained"
        disabled={!ticker || !mode || !numStocks || !limitPrice}
        style={buttonStyle} onClick={handlePreviewClick}
        type="submit">
        Preview Order
      </Button>

      <Dialog 
      open={isPreviewShown}
      fullWidth={true}
      onClose={(_, reason) => {
        if(reason !== 'backdropClick'){
          setIsPreviewShown(false);
        }
      }}>
        <DialogTitle>
          Order Summary
        </DialogTitle>
        <DialogContent>
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
          <Typography id="modal-modal-descr-limitPrice" sx={{ mt: 2 }}>
            Total: ${numStocks * limitPrice}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained"
            disabled={isConfirmDisabled}
            onClick={() => {
              handleMakeOrder()
            }} >Confirm</Button>
          <Button
            onClick={handleClose}
            disabled={isConfirmDisabled}>Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isModalShown}>
        <DialogTitle>
          {modalMessage}
        </DialogTitle>
      </Dialog>


    </Stack >
  );
}


function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

