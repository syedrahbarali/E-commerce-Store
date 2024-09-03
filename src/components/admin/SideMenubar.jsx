import React from "react";
import { NavLink } from "react-router-dom";

const SideMenubar = () => {
  const menuItem = [
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
    <div className="w-1/6 h-full">
      <h3 className="text-xl font-bold py-4">Admin Dashboard</h3>
      <ul>
        {menuItem.map((item, index) => (
          <li key={index}>
            <NavLink
              to={`${item.path}`}
              className="p-4 border block my-2 hover:bg-slate-900"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenubar;
