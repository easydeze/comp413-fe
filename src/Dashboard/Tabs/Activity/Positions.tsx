import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface Position {
  symbol: string;
  companyName: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  totalValue: number;
  lifetimeReturn: number;
  lifetimeReturnPercentage: number;
}

// Temporary mock data - replace with API call later
const mockPositions: Position[] = [
  {
    symbol: "AAPL",
    companyName: "Apple Inc.",
    quantity: 10,
    averageCost: 150.0,
    currentPrice: 175.0,
    totalValue: 1750.0,
    lifetimeReturn: 250.0,
    lifetimeReturnPercentage: 16.67,
  },
  {
    symbol: "GOOGL",
    companyName: "Alphabet Inc.",
    quantity: 5,
    averageCost: 2800.0,
    currentPrice: 3000.0,
    totalValue: 15000.0,
    lifetimeReturn: 1000.0,
    lifetimeReturnPercentage: 7.14,
  },
];

const formatCurrency = (value: number) => {
  return `$${value.toFixed(2)}`;
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

const Positions = () => {
  const [positions, setPositions] = useState<Position[]>(mockPositions);

  // Calculate totals
  const totalValues = {
    totalPortfolioValue: positions.reduce(
      (sum, position) => sum + position.totalValue,
      0,
    ),
    totalLifetimeReturn: positions.reduce(
      (sum, position) => sum + position.lifetimeReturn,
      0,
    ),
    totalLifetimeReturnPercentage:
      (positions.reduce((sum, position) => sum + position.lifetimeReturn, 0) /
        positions.reduce((sum, position) => sum + position.totalValue, 0)) *
      100,
  };

  // TODO: Add API call to fetch real positions data
  // useEffect(() => {
  //   const fetchPositions = async () => {
  //     try {
  //       const response = await positionsAPI.getPositions();
  //       setPositions(response.data);
  //     } catch (error) {
  //       console.error('Failed to fetch positions:', error);
  //     }
  //   };
  //   fetchPositions();
  // }, []);

  return (
    <Stack spacing={2}>
      <h2>Current Positions</h2>

      {/* Summary Cards */}
      <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Portfolio Value
          </Typography>
          <Typography variant="h6">
            {formatCurrency(totalValues.totalPortfolioValue)}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total Lifetime Return
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color:
                totalValues.totalLifetimeReturn >= 0
                  ? "success.main"
                  : "error.main",
            }}
          >
            {formatCurrency(totalValues.totalLifetimeReturn)} (
            {formatPercentage(totalValues.totalLifetimeReturnPercentage)})
          </Typography>
        </Paper>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Average Cost</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="right">Lifetime Return</TableCell>
              <TableCell align="right">Return %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position) => (
              <TableRow
                key={position.symbol}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {position.symbol}
                </TableCell>
                <TableCell>{position.companyName}</TableCell>
                <TableCell align="right">{position.quantity}</TableCell>
                <TableCell align="right">
                  {formatCurrency(position.averageCost)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(position.currentPrice)}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(position.totalValue)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      position.lifetimeReturn >= 0
                        ? "success.main"
                        : "error.main",
                  }}
                >
                  {formatCurrency(position.lifetimeReturn)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      position.lifetimeReturnPercentage >= 0
                        ? "success.main"
                        : "error.main",
                  }}
                >
                  {formatPercentage(position.lifetimeReturnPercentage)}
                </TableCell>
              </TableRow>
            ))}

            {/* Total Row */}
            <TableRow
              sx={{
                backgroundColor: "action.hover",
                fontWeight: "bold",
                "& td": { fontWeight: "bold" },
              }}
            >
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell align="right">
                {formatCurrency(totalValues.totalPortfolioValue)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    totalValues.totalLifetimeReturn >= 0
                      ? "success.main"
                      : "error.main",
                }}
              >
                {formatCurrency(totalValues.totalLifetimeReturn)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    totalValues.totalLifetimeReturnPercentage >= 0
                      ? "success.main"
                      : "error.main",
                }}
              >
                {formatPercentage(totalValues.totalLifetimeReturnPercentage)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Positions;
