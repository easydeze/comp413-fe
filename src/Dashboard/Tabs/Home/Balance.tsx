import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import {
  homeBalanceHttp,
  homeCurrentBalanceHttp,
} from "../../../API/Home/HomeAPI";
import { Stack } from "@mui/system";
import { Card, Typography, CardContent, CircularProgress } from "@mui/material";
import { wait } from "@testing-library/user-event/dist/utils";

export default function Balance() {
  const [total, setTotal] = useState(0);
  const [timestamps, setTimestamps] = useState<Date[]>([]);
  const [balances, setBalances] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

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
            setTimestamps(response.timestamps);
            setBalances(response.balances);
            setTotal(currentBalance);

            //Add the balance to the session storage
            sessionStorage.setItem("balance", currentBalance.toString());
            setIsLoading(false);
          }
        }
      } catch (error) {
        if (token) {
          //Flag for seeing if next attempts have succeeded
          var completed = false;

          setError(true);
          setMessage("Attempting to get balances. Loading...")

          //Try again two more times then set isLoading to false
          for (let i = 1; i < 3; i++) {
            console.log("Trynig to get account balance after mishap")
            try {
              var response = await homeBalanceHttp(token);
              var currentBalance = await homeCurrentBalanceHttp(token);

              if (response && currentBalance) {
                setTimestamps(response.timestamps);
                setBalances(response.balances);
                setTotal(currentBalance);

                //Add the balance to the session storage
                sessionStorage.setItem("balance", currentBalance.toString());
                setIsLoading(false);
              }

              completed = true

            } catch (error) {
              console.error("Attempted " + i + " times");
            }

          }

          //Check to see if anything was success
          if (completed) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setMessage("Failed to obtain account balance history")
          }

        }
      }
    };

    fetchBalances();
  }, [token]);

  return error || !timestamps || !balances ? (
    <Card style={{ margin: "20px", padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        {message}
      </Typography>
      <CardContent>
        <Stack direction="row">
          {isLoading ? (
            <div style={{ flex: 1, padding: "10px", textAlign: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <div style={{ flex: 1, padding: "10px" }}>
              {/* Nothing should be displayed */}
            </div>
          )}
        </Stack>
      </CardContent>
    </Card>
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
            <LineChart
              xAxis={[
                {
                  data: timestamps,
                  label: "Date",
                  valueFormatter: (value) => new Date(value).toLocaleString(),
                },
              ]}
              series={[
                {
                  data: balances,
                },
              ]}
              height={300}
              width={600}
            />
          )}


        </Stack>
      </CardContent>
    </Card>
  );
}
