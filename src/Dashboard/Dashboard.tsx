import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Home from "./Pages/Home";
import Activity from "./Pages/Activity";
import BuySell from "./Pages/BuySell";
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
    setUsername(""); // Clear username on logout
  };

  const handleLogin = (name: string) => {
    setUsername(name);
    setLoginScreen(false);
  };


  return (
    <>
      <Header
        toggleSidebar={() => toggleSidebar(true)}
        username={username}
        handleLogout={handleLogout}
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
        username={username}
      />
      {loginScreen && <Login toggleLogin={toggleLogin} onLogin={handleLogin} />}
    </>
  );
};

export default Dashboard;
