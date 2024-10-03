import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";

const balance_api = "";

export default function Balance() {
  // API call to get top 3 movements.
  let [balances, setBalances] = useState<any[]>([]);

  useEffect(() => {
    fetch(balance_api)
      .then((response) => response.json())
      .then((data) => setBalances(data));
  }, []);

  return (
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
