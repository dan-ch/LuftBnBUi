import "App.scss";
//import { RootState } from "store";
import { BottomNavbar, Navbar } from "components";
import { SignIn } from "pages/auth/SignIn";
import { SignUp } from "pages/auth/SignUp";
import Offer from "pages/offer/Offer";
import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { MyReservations } from "../pages/myReservations/MyReservations";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { Search } from "../pages/search/Search";
import { AddOffer } from "pages/addOffer/AddOffer";
import { SearchProvider } from "../context/SearchProvider";
import { EditOffer } from "../pages/editOffer/EditOffer";
import { Settings } from "pages/settingsPage/Settings";


interface RoutesProps {
}

export const RoutesConfig: React.FC<RoutesProps> = () => {


  return (
    <SearchProvider>
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp/>
              </PublicRoute>

            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn/>
              </PublicRoute>
            }
          />
          <Route
            path="/myReservations"
            element={
              <ProtectedRoute>
                <MyReservations/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/addOffer"
            element={
              <ProtectedRoute>
                <AddOffer/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/editOffer"
            element={
              <ProtectedRoute>
                <EditOffer/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <Search/>
            }
          />
          <Route
            path="/offer/:id"
            element={
              <ProtectedRoute>
                <Offer/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route
            path="/home"
            element={
              <Home/>
            }
          />

        </Routes>

        <BottomNavbar/>
      </HashRouter>
    </SearchProvider>
  );
};
