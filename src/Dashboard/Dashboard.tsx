import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import "../style.css";
import Home from "./Pages/Home/Home";
import Activity from "./Pages/Activity";
import BuySell from "./Pages/BuySell";

export default function Dashboard() {
  const [selectView, setSelectView] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleView = (view: string) => {
    setSelectView(view);
  };

  const toggleSidebar = (newOpen: boolean) => {
    setSidebarOpen(newOpen);
  };

  return (
    <>
      <Header toggleSidebar={() => toggleSidebar(true)} />
      <div id="contentContainer">
        {selectView === "Home" ? (
          <Home />
        ) : selectView === "Activity" ? (
          <Activity />
        ) : (
          <BuySell />
        )}
      </div>
      <Sidebar
        open={sidebarOpen}
        handleView={handleView}
        toggleSidebar={toggleSidebar}
      />
    </>
  );
}
