import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layouts from "./components/layout/Layouts";
import Home from "./pages/Home";
import { Login, Signup } from "./components";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddCategory from "./components/admin/dashboard/AddCategory";
import AddProduct from "./components/admin/dashboard/AddProduct";
import Users from "./components/admin/dashboard/Users";
import Dashboard from "./components/user/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/dashboard" element={<UserProtectedRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/dashboard/admin" element={<AdminProtectedRoute />}>
            <Route path="" element={<AdminDashboard />}>
              <Route path="add-category" element={<AddCategory />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
