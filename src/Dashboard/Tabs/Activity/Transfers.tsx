import React from "react";
import { transferHttp } from "../../../API/Transfers/TransfersAPI";
import {
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Button,
} from "@mui/material";
import { Popup } from "../../Popup";

const Transfers = () => {
  const [alignment, setAlignment] = React.useState("deposit");
  const [amount, setAmount] = React.useState(0);
  const [popup, setPopup] = React.useState("");
  const [neg, setNeg] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setAmount(0);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(event.target.value);
    setAmount(newAmount);
  };

  const submitTransaction = () => {
    if (amount > 0 && token) {
      transferHttp(alignment, amount, token);
      if (alignment == "withdrew") {
        setPopup(`Withdrew $${amount}.`);
      } else {
        setPopup(`Deposited $${amount}.`);
      }
      setNeg(false);
    } else {
      setNeg(true);
    }
    setAmount(0);
  };

  const handleClosePopup = () => {
    setPopup("");
  };

  return (
    <>
      {popup !== "" && (
        <Popup
          msg1="Transaction completed."
          msg2={popup}
          onClose={handleClosePopup}
        />
      )}
      <Stack
        component="form"
        sx={{ width: "25ch" }}
        spacing={2}
        noValidate
        autoComplete="off"
        marginTop={5}
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="deposit">Deposit</ToggleButton>
          <ToggleButton value="withdraw">Withdraw</ToggleButton>
        </ToggleButtonGroup>
        <FormControl>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          {neg ? (
            <FormHelperText style={{ color: "red" }}>
              Enter an amount greater than $0.
            </FormHelperText>
          ) : (
            <FormHelperText>Enter an amount greater than $0.</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Button variant="contained" onClick={submitTransaction}>
        Submit
      </Button>
    </>
  );
};

export default Transfers;
