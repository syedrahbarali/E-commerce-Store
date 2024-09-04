import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Logo, Logout } from "../index";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import Select from "../Select";

const Header = () => {
  const authStatus = useSelector((store) => store.auth.status);
  const role = useSelector((store) => store.auth.userData.role);
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
      title: "Rahbar",
      active: authStatus,
    },
    {
      title: "Dashboard",
      path: `/dashboard${role === "admin" ? "/admin" : ""}`,
      active: authStatus,
    },
    {
      title: "Log out",
      active: authStatus,
    },
  ];

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
            <span className="absolute -right-3 text-xs -top-1.5 px-1 rounded-full font-semibold bg-red-600">
              7
            </span>
            <HiShoppingCart size={24} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
