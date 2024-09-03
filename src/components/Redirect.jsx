import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = ({ path = "login" }) => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (counter <= 0) navigate(`/${path}`, { state: { from: location } });

    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  return <div>Redirecting you in {counter} seconds</div>;
};

export default Redirect;
