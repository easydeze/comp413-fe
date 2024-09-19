import Movements from "./Movements";
import Balance from "./Balance";

export default function Home() {
  return (
    <>
      <h2>Home</h2>
      <div className="home">
        <Balance />
        <Movements />
      </div>
    </>
  );
}
