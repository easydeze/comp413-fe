import { useEffect, useState } from "react";
import { homeMovementsHttp } from "../../../API/Home/HomeAPI";
import {
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface Movement {
  symbol: string;
  difference: number;
  last_price: number;
}

const DetailedMovement = (difference: number) => {
  const style = {
    color: difference > 0 ? "green" : "red",
    padding: 0,
    margin: 0,
  };
  return difference > 0 ? (
    <p style={style}>+{difference}</p>
  ) : (
    <p style={style}>{difference}</p>
  );
};

export default function Movements() {
  // API call to get top 3 movements.
  let [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);
    const fetchMovements = async () => {
      try {
        if (token) {
          const response = await homeMovementsHttp(token);
          if (response) {
            setMovements(response.movements);
            setIsLoading(false);
          }
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchMovements();
  }, [token]);

  return error ? (
    <div>There is an error getting movements.</div>
  ) : (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Top and bottom movers</h2>
        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <TableContainer component={Paper}>
              <Table aria-label="orders table" size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Symbol</TableCell>
                    <TableCell align="left">Difference</TableCell>
                    <TableCell align="left">Last Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movements.map((movement, _) => (
                    <TableRow>
                      <TableCell align="left">{movement.symbol}</TableCell>
                      <TableCell align="left">
                        {DetailedMovement(movement.difference)}
                      </TableCell>
                      <TableCell align="left">{movement.last_price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      </div>
    </>
  );
}
