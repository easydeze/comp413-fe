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
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";
import { getPositionsHttp } from "../../../API/Dashboard/PositionsAPI";

interface Position {
    symbol: string;
    quantity: number;
    averageCost: number;
    currentPrice: number;
    totalValue: number;
    lifetimeReturn: number;
    lifetimeReturnPercentage: number;
}

const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
};

const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
};

const Positions = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                if (token) {
                    const data = await getPositionsHttp(token);
                    // Map the returned data to match the Position interface
                    const mappedPositions: Position[] = data.map((pos: any) => ({
                        symbol: pos.symbol,
                        quantity: pos.quantity,
                        averageCost: pos.avgBuyPrice,
                        currentPrice: pos.currentPrice,
                        totalValue: pos.currentValue,
                        lifetimeReturn: pos.totalReturn,
                        lifetimeReturnPercentage: pos.returnPercentage,
                    }));
                    setPositions(mappedPositions);
                }
            } catch (error) {
                console.error("Failed to fetch positions:", error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPositions();
    }, [token]);

    // Calculate totals
    const totalValues = {
        totalPortfolioValue: positions.reduce(
            (sum, position) => sum + position.totalValue,
            0
        ),
        totalLifetimeReturn: positions.reduce(
            (sum, position) => sum + position.lifetimeReturn,
            0
        ),
        totalLifetimeReturnPercentage:
            positions.length > 0
                ? (positions.reduce((sum, position) => sum + position.lifetimeReturn, 0) /
                    positions.reduce((sum, position) => sum + position.totalValue, 0)) *
                100
                : 0,
    };

    if (error) {
        return (
            <Card style={{ margin: "20px", padding: "20px" }}>
                <Typography variant="h5" color="error">
                    There was an error fetching your positions.
                </Typography>
            </Card>
        );
    }

    return (
        <Stack spacing={2} marginTop={5}>
            {isLoading ? (
                <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
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

                    <Card style={{ margin: "20px", padding: "20px" }}>
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Symbol</TableCell>
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

                                        {positions.length > 0 && (
                                            <TableRow
                                                sx={{
                                                    backgroundColor: "action.hover",
                                                    fontWeight: "bold",
                                                    "& td": { fontWeight: "bold" },
                                                }}
                                            >
                                                <TableCell colSpan={4}>Total</TableCell>
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
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </>
            )}
        </Stack>
    );
};

export default Positions;