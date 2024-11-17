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
  const [username, setUsername] = useState("");

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
    setUsername(""); // Clear username
    localStorage.setItem("token", "");
  };

  const handleLogin = (name: string, newToken: string) => {
    setUsername(name);
    setLoginScreen(false);
    localStorage.setItem("token", newToken);
  };

  return (
    <>
      <Header toggleSidebar={() => toggleSidebar(true)} username={username} />
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
        username={username}
      />
      {loginScreen && <Login toggleLogin={toggleLogin} onLogin={handleLogin} />}
    </>
  );
};

export default Dashboard;
