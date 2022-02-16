import React, { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { SearchDrawer } from "./SearchDrawer";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";


interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {

  const { userState } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };

  const navigate = useNavigate();

  return (
    <main>
      <div className="home">
        <h1>Wybierz swoje wymarzone miejsce na podróż</h1>
        <button onClick={ () => userState.authenticated ? toggle() : navigate("/signin")} className="home__button">
          <SearchIcon fontSize="medium" className="home__search-icon" />
          Dokąd chcesz pojechać?
        </button>

      </div>
      <Drawer open={visible} onClose={toggle} anchor="top">
        <SearchDrawer />
      </Drawer>
    </main>
  );
};
