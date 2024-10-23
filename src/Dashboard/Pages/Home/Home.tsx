import Movements from "./Movements";
import Balance from "./Balance";

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
  return token != "" ? (
    <>
      <h2>Home</h2>
      <div className="home">
        <Balance token={token} />
        <Movements token={token} />
      </div>
    </>
  ) : (
    <></>
  );
}
