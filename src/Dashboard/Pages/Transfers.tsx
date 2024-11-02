import React from "react";
import { transferHttp } from "../../API/Transfers/TransfersAPI";
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

interface TransfersProps {
  token: string;
}

const Transfers = ({ token }: TransfersProps) => {
  const [alignment, setAlignment] = React.useState("buy");
  const [amount, setAmount] = React.useState(0);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(event.target.value);
    setAmount(newAmount);
  };

  const submitTransaction = () => {
    if (amount >= 0) {
      transferHttp(alignment, amount, token);
    } else {
      console.log("Amount not valid.");
    }
  };

  return (
    <>
      <h1>Transfers</h1>
      <Stack
        component="form"
        sx={{ width: "25ch" }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="buy">Buy</ToggleButton>
          <ToggleButton value="sell">Sell</ToggleButton>
        </ToggleButtonGroup>
        <FormControl>
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            type="number"
            onChange={handleAmountChange}
          />
          <FormHelperText>Enter an amount greater than $0.</FormHelperText>
        </FormControl>
      </Stack>
      <Button variant="contained" onClick={submitTransaction}>
        Submit
      </Button>
    </>
  );
};

export default Transfers;
