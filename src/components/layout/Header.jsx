import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Logo, Logout } from "../index";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import Select from "../Select";
import storageService from "@/appwrite/storage";

const Header = () => {
  const authStatus = useSelector((store) => store.auth.status);
  const userData = useSelector((store) => store.auth.userData);
  const [cart, setCart] = useState(0);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Category",
      path: "/",
      active: true,
    },
    {
      name: "Sign up",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "Log in",
      path: "/login",
      active: !authStatus,
    },
  ];

  const options = [
    {
      title: userData.role,
      active: authStatus,
    },
    {
      title: "Dashboard",
      path: `/dashboard${userData.role === "admin" ? "/admin" : ""}`,
      active: authStatus,
    },
    {
      title: "Log out",
      active: authStatus,
    },
  ];

  useEffect(() => {
    authStatus &&
      storageService.getCartItems(userData.$id).then((response) => {
        setCart(response.total);
      });
  }, [authStatus]);

  return (
    <div className="py-4 sticky top-0 bg-inherit shadow-md">
      <Container classNmae="flex item-center justify-between">
        <Logo />

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex items-center  gap-4">
            {navItems.map((item, index) =>
              item.active ? (
                <li key={index}>
                  <NavLink to={item.path} className="font-semibold">
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && <Select options={options} />}
            {authStatus && <Logout />}
          </ul>
          <div className="relative">
            {cart ? (
              <span className="absolute -right-3 text-xs -top-1.5 px-1 rounded-full font-semibold bg-red-600">
                {cart}
              </span>
            ) : null}
            <HiShoppingCart size={24} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
