import Movements from "./Movements";
import Balance from "./Balance";
import { Stack } from "@mui/system";

export default function Home() {
  return sessionStorage.getItem("token") !== "" ? (
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
