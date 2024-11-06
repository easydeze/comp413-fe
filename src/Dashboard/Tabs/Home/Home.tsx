import Movements from "./Movements";
import Balance from "./Balance";
import { Stack } from "@mui/system";

interface HomeProps {
  token: string;
}

export default function Home({ token }: HomeProps) {
  return token != "" ? (
    <>
      <Stack direction="row" spacing={10}>
        <Balance token={token} />
        <Movements token={token} />
      </Stack>
    </>
  ) : (
    <></>
  );
}
