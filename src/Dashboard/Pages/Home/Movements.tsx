import { useEffect, useState } from "react";

const movement_api = "";

const Movement = ({
  symbol,
  difference,
  last_price,
}: {
  symbol: string;
  difference: number;
  last_price: number;
}) => {
  const isPositive = difference >= 0;
  const movementStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: isPositive ? "#e0f7e0" : "#f7e0e0",
    color: isPositive ? "green" : "red",
    border: "1px solid #ccc",
    margin: "5px 0",
  };

  return (
    <div className="movement" style={movementStyle}>
      <p>{symbol}</p>
      <p>{difference.toFixed(2)}</p>
      <p>{last_price.toFixed(2)}</p>
    </div>
  );
};

export default function Movements() {
  // API call to get top 3 movements.
  let [movements, setMovements] = useState<any[]>([]);

  useEffect(() => {
    fetch(movement_api)
      .then((response) => response.json())
      .then((data) => setMovements(data));
  }, []);

  movements = [
    {
      symbol: "AAPL",
      difference: 5.23,
      last_price: 145.32,
    },
    {
      symbol: "TSLA",
      difference: -12.87,
      last_price: 695.4,
    },
    {
      symbol: "AMZN",
      difference: 8.45,
      last_price: 3330.12,
    },
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>Top/bottom movers</h3>
        <div className="movers">
          {movements.map((movement, index) => (
            <Movement
              key={index}
              symbol={movement.symbol}
              difference={movement.difference}
              last_price={movement.last_price}
            />
          ))}
        </div>
      </div>
    </>
  );
}
