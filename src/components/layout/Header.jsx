import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Logo, Logout } from "../index";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((store) => store.auth.status);
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

  return (
    <div className="py-4 sticky top-0 bg-inherit shadow-md">
      <Container classNmae="flex item-center justify-between">
        <Logo />

        <ul className="flex items-center  gap-4">
          {navItems.map((item, index) =>
            item.active ? (
              <li key={index}>
                <NavLink to={item.path} className="font-semibold">
                  {item.name}
                </NavLink>
              </li>
            ) : null
          )}
          <li>
            <Link>
              <HiShoppingCart size={24} />
            </Link>
          </li>
          {authStatus && <Logout />}
        </ul>
      </Container>
    </div>
  );
};

export default Header;
