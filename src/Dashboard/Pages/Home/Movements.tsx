import { useEffect, useState } from "react";
import { homeMovementsHttp } from "../../../API/Home/HomeAPI";

interface MovementProps {
  token: string;
}

interface Movement {
  symbol: string;
  difference: number;
  last_price: number;
}

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

export default function Movements({ token }: MovementProps) {
  // API call to get top 3 movements.
  let [movements, setMovements] = useState<Movement[]>([]);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await homeMovementsHttp(token);
        if (response) {
          setMovements(response.movements);
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
