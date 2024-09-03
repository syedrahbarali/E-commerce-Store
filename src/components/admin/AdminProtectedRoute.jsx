import Redirect from "../Redirect";
import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import { Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const login = useSelector((store) => store.auth);
  return (
    <>
      {login.status && login.userData.role === "admin" ? (
        <Outlet />
      ) : (
        <Redirect path="" />
      )}
    </>
  );
};

export default AdminProtectedRoute;
