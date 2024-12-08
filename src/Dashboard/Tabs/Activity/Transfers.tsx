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
import { homeCurrentBalanceHttp } from "../../../API/Home/HomeAPI";

const Transfers = () => {
  const [alignment, setAlignment] = React.useState("deposit");
  const [amount, setAmount] = React.useState("");
  const [popup, setPopup] = React.useState("");
  const [neg, setNeg] = React.useState(false);
  const token = sessionStorage.getItem("token");
  const [balance, setBalance] = React.useState(sessionStorage.getItem("balance") ? sessionStorage.getItem("balance") : 0);


  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setAmount("");
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const submitTransaction = async () => {
    if (Number(amount) > 0 && token) {
      try {
        await transferHttp(alignment, Number(amount), token);
        if (alignment === "withdraw") {
          setPopup(`Withdrew $${amount}.`);
        } else {
          setPopup(`Deposited $${amount}.`);
        }

        const newBalResponse = await homeCurrentBalanceHttp(token)

        //If a balance is obtained, update session info and set new balance
        if (newBalResponse) {
          sessionStorage.setItem("balance", newBalResponse.toString());
          setBalance(newBalResponse.toString());
          console.log("New Balance:: " + JSON.stringify(newBalResponse))
        } 


      } catch (error) {
        setPopup("Unable to complete transaction.");
      } finally {
        setNeg(false);
      }
    } else {
      setNeg(true);
    }
    setAmount("");
  };

  const handleClosePopup = () => {
    setPopup("");
  };

  return (
    <>
      {popup !== "" && (
        <Popup
          msg1="Processing transaction..."
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

        <Stack direction="row" spacing={3} margin={2} alignItems="center">
          <OutlinedInput startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Current Amount"
            type="number"
            value={balance}
            slotProps={{
              input: { readOnly: true },
            }}></OutlinedInput>
        </Stack>

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
