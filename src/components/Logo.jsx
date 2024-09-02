import { Link } from "react-router-dom";

const Logo = ({ className = "", ...props }) => {
  return (
    <Link className={`font-bold text-2xl ${className}`} {...props} to={`/`}>
      Logo
    </Link>
  );
};

export default Logo;
