import React, { useContext } from 'react';
import { UserActions, UserContext } from "../../context/AuthProvider";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import { useQuery } from "react-query";
import axios from "utils/axiosInstance";
import { LoadingIndicator } from "../../components";
import { Offer } from 'models/Offer';
import { OfferTile } from "../search/components/OfferTile";
import { UserOfferTile } from "./components/UserOfferTile";

interface SettingsProps {

}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const { dispatch } = useContext(UserContext);
  const { data: userOffer, isLoading, refetch } = useQuery<Offer[]>('userOffers', async () => {
    const res = await axios.get("./user/offer");
    return res.data;
  })
  // @ts-ignore
  return (<div className="settings">
    <Button onClick={() => dispatch({ type: UserActions.logout, payload: '' })}>Wyloguj się</Button>
    <Divider className="settings__divider"/>
    <h1>Twoje oferty</h1>
    {isLoading ? <LoadingIndicator /> : userOffer?.map((offer: Offer) => (
      <UserOfferTile offer={offer} onDelete={refetch} key={offer.id}/>
    ))}

  </div>);
};