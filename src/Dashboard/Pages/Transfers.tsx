import React from "react";
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

const Transfers = () => {
  const [alignment, setAlignment] = React.useState("buy");
  const [amount, setAmount] = React.useState(0);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleAmountChange = (
    event: React.MouseEvent<HTMLElement>,
    newAmount: number
  ) => {
    setAmount(newAmount);
  };

  return (
    <>
      <h1>Transfers</h1>
      <p>Enter your transfer details:</p>
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
          />
          <FormHelperText>Enter an amount greater than $0.</FormHelperText>
        </FormControl>
        <Button>Submit</Button>
      </Stack>
    </>
  );
};

export default Transfers;
