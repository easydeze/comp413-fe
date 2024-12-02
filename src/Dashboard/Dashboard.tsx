import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../style.css";
import Home from "./Tabs/Home/Home";
import Activity from "./Tabs/Activity/Activity";
import BuySell from "./Tabs/BuySell/BuySell";
import Login from "../Login/Login";

const Dashboard: React.FC = () => {
  const [selectView, setSelectView] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginScreen, setLoginScreen] = useState(true);

  const handleView = (view: string) => {
    setSelectView(view);
  };

  const toggleSidebar = (newOpen: boolean) => {
    setSidebarOpen(newOpen);
  };

  const toggleLogin = (value: boolean) => {
    setLoginScreen(value);
  };

  const handleLogout = () => {
    setLoginScreen(true);
    setSelectView("Home");
    sessionStorage.setItem("username", ""); // Clear username
    sessionStorage.setItem("token", "");
  };

  const handleLogin = (name: string, newToken: string) => {
    setLoginScreen(false);
    sessionStorage.setItem("username", name);
    sessionStorage.setItem("token", newToken);
  };

  return (
    <>
      <Header
        toggleSidebar={() => toggleSidebar(true)}
        username={sessionStorage.getItem("username") ?? ""}
      />
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
        handleLogout={handleLogout}
        username={sessionStorage.getItem("username") ?? ""}
      />
      {loginScreen && <Login toggleLogin={toggleLogin} onLogin={handleLogin} />}
    </>
  );
};

export default Dashboard;
