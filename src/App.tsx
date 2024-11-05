import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
