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
  Card,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";

interface Movement {
  ticker: string;
  difference: number;
  yesterdayPrice: number;
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
            setMovements(response.changes);
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
    <Card style={{ margin: "20px", padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" gutterBottom>
          Top and Bottom Movers
        </Typography>
        <>
          {isLoading ? (
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <CardContent>
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
                        <TableCell align="left">{movement.ticker}</TableCell>
                        <TableCell align="left">
                          {DetailedMovement(movement.difference)}
                        </TableCell>
                        <TableCell align="left">
                          {movement.yesterdayPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          )}
        </>
      </div>
    </Card>
  );
}
