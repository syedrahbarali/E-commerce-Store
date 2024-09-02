import React from "react";
import { Button } from "./ui/button";
import authService from "@/appwrite/auth";
import toast from "react-hot-toast";
import { logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then((response) => {
      if (response) {
        toast.success("Logged out successfully");
        dispatch(logout());
      }
    });
  };

  return <Button onClick={handleLogout}>Log out</Button>;
};

export default Logout;
