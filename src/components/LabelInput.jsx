import React, { forwardRef } from "react";
import { Input } from "./ui/input";

const LabelInput = (
  { label, className = "", type = "text", ...props },
  ref
) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label className="font-semibold">{label}</label>}
      <Input
        type={type}
        className={`block py-5 font-semibold ${className}`}
        {...props}
        ref={ref}
      />
    </div>
  );
};

export default forwardRef(LabelInput);
