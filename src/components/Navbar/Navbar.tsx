import React from "react";
import { Link } from "react-router-dom";
import AirIcon from "@mui/icons-material/Air";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const authenticated = false;
  return (
    <nav className="navbar centerXY">
      {authenticated ? (
        <div className="navbar__content">
          <Link to="/home" className="navbar__content__company-name">
            LuftB&B
          </Link>

          <></>
        </div>
      ) : (
        <div className="navbar__content">
          <Link to="/home" className="navbar__content__company-name">
            LuftB&B
          </Link>
          <AirIcon fontSize="large" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;