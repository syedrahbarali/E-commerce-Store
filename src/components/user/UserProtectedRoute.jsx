import { Outlet } from "react-router-dom";
import Redirect from "../Redirect";
import { useSelector } from "react-redux";

const UserProtectedRoute = () => {
  const authStatus = useSelector((store) => store.auth.status);
  return <>{authStatus ? <Outlet /> : <Redirect />}</>;
};

export default UserProtectedRoute;
