import React, { forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Select = ({ options = [], className = "", ...props }, ref) => {
  const navigate = useNavigate();
  const activeLink = (link) => {
    navigate(`${link}`);
  };

  return (
    <select ref={ref} className={`bg-transparent ${className}`} {...props}>
      {options?.map((option, index) =>
        option.active === undefined || option.active ? (
          <option
            onClick={() => activeLink(option.path ? option.path : "")}
            key={index}
            value={option.title ? option.title : option}
            className="text-black cursor-pointer"
          >
            {option.title ? option.title : option}
          </option>
        ) : null
      )}
    </select>
  );
};

export default forwardRef(Select);
