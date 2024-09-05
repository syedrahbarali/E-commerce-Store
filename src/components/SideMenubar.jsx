import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideMenubar = ({ menuItems }) => {
  const role = useSelector((store) => store.auth.userData);

  return (
    <div className="w-1/6 h-full">
      <h3 className="text-xl font-bold py-4 capitalize">
        Welcome {role.name ? role.name : role.role} !
      </h3>
      <ul>
        {menuItems.map((item, index) => (
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
