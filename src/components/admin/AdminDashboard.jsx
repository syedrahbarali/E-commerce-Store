import { Outlet } from "react-router-dom";
import SideMenubar from "../SideMenubar";

const AdminDashboard = () => {
  const menuItems = [
    {
      name: "Add Category",
      path: "add-category",
    },
    {
      name: "Add Product",
      path: "add-product",
    },
    {
      name: "Users",
      path: "users",
    },
  ];

  return (
    <div className="flex h-full gap-4">
      <SideMenubar menuItems={menuItems} />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
