import { Outlet } from "react-router-dom";
import SideMenubar from "./SideMenubar";

const AdminDashboard = () => {
  return (
    <div className="flex h-full gap-4">
      <SideMenubar />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
