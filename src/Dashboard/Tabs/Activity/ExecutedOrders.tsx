import React from "react";
import { Outlet } from "react-router-dom";
import ExecutedOrdersTable from "./ExecutedOrdersTable";

const ExecutedOrders = () => {
  return (
    <div>
      <ExecutedOrdersTable />
      <Outlet />
    </div>
  );
};

export default ExecutedOrders;
