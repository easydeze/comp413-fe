import { LineChart } from "@mui/x-charts/LineChart";
import { useState, useEffect } from "react";
import { homeBalanceHttp } from "../../../API/Home/HomeAPI";

interface BalanceProps {
  token: string;
}

export default function Balance({ token }: BalanceProps) {
  const [xBalances, setXBalances] = useState<number[]>([]);
  const [yBalances, setYBalances] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      setIsLoading(true);
      try {
        const response = await homeBalanceHttp(token);
        if (response) {
          setXBalances(response.list1);
          setYBalances(response.list2);
          setIsLoading(false);
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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h3>Balance</h3>
      <>
        {isLoading ? (
          <div style={{ flex: 1, padding: "10px" }}>
            <LineChart
              xAxis={[{ data: [] }]}
              series={[
                {
                  data: [],
                },
              ]}
              height={400}
              width={1000}
            />
          </div>
        ) : (
          <div style={{ flex: 1, padding: "10px" }}>
            <LineChart
              xAxis={[{ data: xBalances }]}
              series={[
                {
                  data: yBalances,
                },
              ]}
              height={400}
              width={1000}
            />
          </div>
        )}
      </>
    </div>
  );
}
