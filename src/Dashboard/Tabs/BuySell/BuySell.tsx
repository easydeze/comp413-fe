<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx

import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Input, Modal, TextField, Typography, Unstable_TrapFocus } from "@mui/material";

import { Box, Stack } from "@mui/system";
import React from "react";

import { Order } from "../../API/Dashboard/BuySellAPI"
import { buyHttp } from "../../API/Dashboard/BuyAPI"
import { sellHttp } from "../../API/Dashboard/SellAPI"
import { getMarketPriceHttp } from "../../API/Dashboard/MarketPriceAPI";
=======
import { Button, Input, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

import { getMarketPrice, makeOrder } from "../../../Model/BuySell_Model";
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx
=======
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx
  p: 4,
};


const buttonStyle = {
  height: '30px',
}

export default function BuySell() {
<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx
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
=======
  const [isShown, setIsShown] = React.useState(false);
  const [mode, setMode] = React.useState("NONE");
  const [ticker, setTicker] = React.useState("");
  const [numStocks, setStockAmount] = React.useState(0);
  const [limitPrice, setLimitPrice] = React.useState(0);
  let marketPrice = 0;
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx

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
<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx

    setTickerError(false)

    getMarketPriceHttp(ticker).then((r) => {
      console.log("Market Price after change for " + ticker)
      console.log(r.marketPrice)

      if (typeof r.marketPrice == "number") {
        setTickerError(false)
        setMarketPrice(r.marketPrice)
=======
    getMarketPrice(ticker).then((r) => {
      if (typeof r == "number") {
        marketPrice = r;
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx
      } else {
        setTickerError(true)
        setMarketPrice(0)
      }
    });
<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx


  };

=======
  };

>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx
  const handleLimitPriceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLimitPrice(Number(event.target.value));
  };

<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx
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
=======
  const handleConfirmClick = () => {
    if (
      ticker !== "" &&
      numStocks !== 0 &&
      mode !== "NONE" &&
      limitPrice !== 0
    ) {
      setIsShown(true);
    } else {
      alert("Enter all required fields.");
    }
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx
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
<<<<<<< HEAD:src/Dashboard/Pages/BuySell.tsx
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
        if(reason != 'backdropClick'){
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
=======
    <Box display="flex" flexDirection="column" alignItems="start">
      <h2>Buy and Sell</h2>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="start"
          textAlign="center"
        >
          <p>Ticker: </p>
          <Input
            id="stock-ticker"
            onChange={handleTickerChange}
            placeholder="Enter Ticker Symbol"
          />
        </Box>

        <Box display="flex" flexDirection="row" alignItems="start">
          <Button onClick={handleBuyClick}>Buy</Button>
          {mode === "BUY" && (
            <Input
              onChange={handleStockNumberChange}
              placeholder="Buy #"
            ></Input>
          )}
          <Button onClick={handleSellClick}>Sell</Button>
          {mode === "SELL" && (
            <Input
              onChange={handleStockNumberChange}
              placeholder="Sell #"
            ></Input>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="start"
          textAlign="center"
        >
          <p>Market Price:: {marketPrice}</p>
          <p>Limit Price:: </p>
          <Input
            id="-desired-market-price"
            onChange={handleLimitPriceChange}
            placeholder="Enter Desired Price"
          />
        </Box>

        <Button variant="contained" onClick={handleConfirmClick}>
          View Order
        </Button>
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
              <Button variant="contained" onClick={handleMakeOrder} autoFocus>
                Confirm
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
>>>>>>> bc3d1b954e86ec866e92907887b54da3e8dafb51:src/Dashboard/Tabs/BuySell/BuySell.tsx
  );
}


function timeout(delay: number) {
  return new Promise(res => setTimeout(res, delay));
}

