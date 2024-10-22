import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { homeBalanceHttp } from "../../../API/Home/HomeAPI";

interface BalanceProps {
  token: string;
}

export default function Balance({ token }: BalanceProps) {
  const [balances, setBalances] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await homeBalanceHttp(token);
        if (response) {
          setBalances(response);
        }
      } catch (error) {
        setError(true);
      }
    };

    fetchBalances();
  }, [token]);

  return error ? (
    <div>There is an error getting balance.</div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Balance</h3>
      <div style={{ flex: 1, padding: "10px" }}>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={400}
          width={1000}
        />
      </div>
    </div>
  );
}
