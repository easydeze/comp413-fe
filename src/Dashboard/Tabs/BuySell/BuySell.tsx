import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import { Stack } from "@mui/system";
import React from "react";

import { Order } from "../../../API/Dashboard/BuySellAPI";
import { buyHttp } from "../../../API/Dashboard/BuyAPI";
import { sellHttp } from "../../../API/Dashboard/SellAPI";
import { getMarketPriceHttp } from "../../../API/Dashboard/MarketPriceAPI";

const buttonStyle = {
  height: "30px",
};

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
  };

  const handleSellClick = () => {
    setMode("sell");
  };

  const handleTickerChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTicker(event.target.value);

    setTickerError(false);

    getMarketPriceHttp(ticker).then(
      (r: { marketPrice: React.SetStateAction<number> }) => {
        if (typeof r.marketPrice == "number") {
          setTickerError(false);
          setMarketPrice(r.marketPrice);
        } else {
          setTickerError(true);
          setMarketPrice(0);
        }
      }
    );
  };

  const handleLimitPriceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLimitPrice(Number(event.target.value));
  };

  const handlePreviewClick = () => {
    if (ticker !== "" && numStocks !== 0 && limitPrice !== 0) {
      setIsPreviewShown(true);
    }
  };

  const handleReset = () => {
    // Reset states
    setIsPreviewShown(false);
    setLimitPrice(0);
    setMode("");
    setStockAmount(0);
    setTicker("");
    setTickerError(false);
    setMarketPrice(0);
  };

  const handleMakeOrder = async () => {
    // Disable the confirm button
    setDisableConfirm(true);

    const newOrder: Order = {
      tickerSymbol: ticker,
      quantity: numStocks,
      limitPrice: limitPrice,
      timestamp: Date(),
    };

    if (token) {
      try {
        // Request the order
        const response =
          mode === "buy"
            ? await buyHttp(newOrder, token)
            : await sellHttp(newOrder, token);

        if (response) {
          // Show success modal
          setModalMessage("Order was created successfully!");
          setIsModalShown(true);

          // Close preview and reset form
          setTimeout(() => setIsModalShown(false), 1000);
          handleClose();
          handleReset();
        } else {
          // Show error modal
          setModalMessage("Order failed to be created. Try again.");
          setIsModalShown(true);
          setTimeout(() => setIsModalShown(false), 1000);
        }
      } catch (error) {
        console.error("ERROR:", error);

        // Show error modal
        setModalMessage("Order failed to be created. Try again.");
        setIsModalShown(true);
        setTimeout(() => setIsModalShown(false), 5000);
      } finally {
        // Re-enable the confirm button
        setDisableConfirm(false);
      }
    }
  };

  const handleStockNumberChange = (event: { target: { value: string } }) => {
    const result = event.target.value.replace(/\D/g, "");

    setStockAmount(Number(result));
  };

  const handleClose = () => setIsPreviewShown(false);

  const token = sessionStorage.getItem("token");

  return (
    <Stack direction="column" spacing={3}>
      <h1>Buy and Sell Stocks</h1>
      <p>As of {Date()}</p>
      <TextField
        required
        id="input-ticker-symbol"
        label="Ticker Symbol"
        value={ticker}
        onChange={handleTickerChange}
        placeholder="Enter Ticker Symbol"
        error={tickerError}
        helperText={tickerError ? "Please enter a ticker symbol" : ""}
      />

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Button
          id="buy-button"
          variant="contained"
          fullWidth
          style={buttonStyle}
          onClick={handleBuyClick}
          sx={{
            backgroundColor: mode === "buy" ? "primary.main" : "gray",
          }}
        >
          Buy
        </Button>
        <Button
          id="sell-button"
          variant="contained"
          fullWidth
          style={buttonStyle}
          onClick={handleSellClick}
          sx={{
            backgroundColor: mode === "sell" ? "primary.main" : "gray",
          }}
        >
          Sell
        </Button>
      </Stack>

      <TextField
        required
        id="input-buy-stock-amount"
        autoComplete="false"
        label="Stock Amount"
        value={numStocks || ""}
        onChange={handleStockNumberChange}
        placeholder={"Number of stocks to " + mode}
        type="number"
        InputProps={{
          inputProps: { min: 0 },
        }}
      />

      <Stack direction="column" spacing={2}>
        <TextField
          label="Market Price"
          value={marketPrice !== 0 ? marketPrice : "-"}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        ></TextField>

        <TextField
          required
          id="input-limit-price"
          autoComplete="false"
          label="Limit Price"
          value={limitPrice || ""}
          onChange={handleLimitPriceChange}
          placeholder={"Enter Limit Price"}
          type="number"
          fullWidth
          InputProps={{
            inputProps: { min: 0 },
          }}
        />

        <h4>Total For Order: ${numStocks * limitPrice}</h4>
      </Stack>

      <Button
        variant="contained"
        disabled={!ticker || !mode || !numStocks || !limitPrice}
        style={buttonStyle}
        onClick={handlePreviewClick}
        type="submit"
      >
        Preview Order
      </Button>

      <Dialog
        open={isPreviewShown}
        fullWidth={true}
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            setIsPreviewShown(false);
          }
        }}
      >
        <DialogTitle>Order Summary</DialogTitle>
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
          <Button
            variant="contained"
            disabled={isConfirmDisabled}
            onClick={handleMakeOrder}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} disabled={isConfirmDisabled}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isModalShown}>
        <DialogTitle>{modalMessage}</DialogTitle>
      </Dialog>
    </Stack>
  );
}
