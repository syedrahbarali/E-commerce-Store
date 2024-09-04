import React from "react";
import SideMenubar from "../SideMenubar";
import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      name: "Orders",
      path: "/dashboard/orders",
    },
  ];
  return (
    <div>
      <SideMenubar menuItems={menuItems} />
      <Outlet />
    </div>
  );
};

export default Dashboard;
