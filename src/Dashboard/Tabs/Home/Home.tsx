import Movements from "./Movements";
import Balance from "./Balance";
import { Stack } from "@mui/system";

export default function Home() {
  console.log("HERE", localStorage.getItem("token"));
  return localStorage.getItem("token") != "" ? (
    <>
      <Stack direction="row" spacing={10}>
        <Balance />
        <Movements />
      </Stack>
    </>
  ) : (
    <></>
  );
}
