import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import {
  homeBalanceHttp,
  homeCurrentBalanceHttp,
} from "../../../API/Home/HomeAPI";
import { Stack } from "@mui/system";
import { Card, Typography, CardContent, CircularProgress } from "@mui/material";

export default function Balance() {
  const [total, setTotal] = useState(0);
  const [xBalances, setXBalances] = useState<number[]>([]);
  const [yBalances, setYBalances] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchBalances = async () => {
      setIsLoading(true);
      try {
        if (token) {
          const response = await homeBalanceHttp(token);
          const currentBalance = await homeCurrentBalanceHttp(token);
          console.log(currentBalance);
          if (response && currentBalance) {
            setXBalances(response.list1);
            setYBalances(response.list2);
            setTotal(currentBalance);


            //Add the balance to the session storage
            sessionStorage.setItem("balance", currentBalance.toString());
            setIsLoading(false);
          }
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchBalances();
  }, [token]);

  return error || !xBalances || !yBalances ? (
    <div>There is an error getting balance.</div>
  ) : (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Balance
      </Typography>
      <Typography variant="h2" color="primary">
        ${total}
      </Typography>
      <CardContent>
        <Stack direction="row">
          {isLoading ? (
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div style={{ flex: 1, padding: "10px" }}>
              <LineChart
                xAxis={[{ data: xBalances, label: "Date" }]}
                series={[
                  {
                    data: yBalances,
                  },
                ]}
                height={300}
                width={600}
              />
            </div>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
