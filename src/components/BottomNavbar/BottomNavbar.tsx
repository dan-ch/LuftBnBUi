import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import BedIcon from '@mui/icons-material/Bed';
import { UserContext } from "../../context/AuthProvider";
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface BottomNavbarProps {}

interface ButtonType {
  label: string;
  path: string;
  icon: JSX.Element;
}

const BottomNavbar: React.FC<BottomNavbarProps> = () => {

  const { userState } = useContext(UserContext);
  const listOfActions: ButtonType[] = [
    {
      label: "Wyszukaj",
      path: "search",
      icon: <SearchIcon />,
    },
    {
      label: "Rezerwacje",
      path: "myReservations",
      icon: <BedIcon />,
    },

    userState.authenticated ? {
      label: "Dodaj",
      path: "addOffer",
      icon: <AddCircleOutlineIcon />,
    } : {
    label: "Zaloguj się",
      path: "signin",
      icon: <LockOpenIcon />,
  },
    userState.authenticated ? {
      label: "Ustawienia",
      path: "settings",
      icon: <SettingsIcon />,
    } :  {
      label: "Zarejestruj się",
      path: "signup",
      icon: <AccountCircleIcon />,
    }
  ];
  const [value, setValue] = useState("search");
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  //TODO ustawienia, moje oferty

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        className="bottom-navbar"
      >
        {listOfActions.map((action: ButtonType) => (
          <BottomNavigationAction
            key={action.path}
            label={action.label}
            icon={action.icon}
            value={action.path}
            component={Link}
            to={`/${action.path}`}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default BottomNavbar;
