import { LineChart } from "@mui/x-charts/LineChart";

export default function Balance() {
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
          height={600}
          width={1200}
        />
      </div>
    </div>
  );
}
