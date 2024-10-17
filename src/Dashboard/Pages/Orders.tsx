import React from "react";
import { Outlet } from "react-router-dom";
import OrdersTable from "./OrdersTable";

const Orders = () => {
  return (
    <div>
      <OrdersTable />
      <Outlet />
    </div>
  );
};

export default Orders;
