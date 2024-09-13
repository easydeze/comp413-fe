import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Button from "@mui/material/Button";

export default function Header({ toggleSidebar }: any) {
  return (
    <header>
      <h1>OwlFinance</h1>
      <Button
        style={{ position: "absolute", right: "20px", top: "20px" }}
        variant="contained"
        onClick={toggleSidebar}
      >
        <ViewHeadlineIcon />
      </Button>
    </header>
  );
}
