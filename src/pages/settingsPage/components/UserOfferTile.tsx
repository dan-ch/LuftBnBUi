import React from 'react';
import { OfferTile } from "../../search/components/OfferTile";
import { Offer } from "models/Offer";
import Button from '@mui/material/Button';
import { useMutation } from "react-query";
import axios from "../../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";


interface UserOfferTileProps {
  offer: Offer;
  onDelete: () => {}
}

export const UserOfferTile: React.FC<UserOfferTileProps> = ({offer, onDelete}) => {
  const { mutate } = useMutation(async () => {
    return await axios.delete(`/offer/${offer.id}`);
  }, {
    onSuccess: () => {
      onDelete();
    }
  } );
  return (
    <>
      <OfferTile offer={offer}/>
      <div className="user-offer-tile">
        <Link to="/editOffer" state={{id: offer.id}}>Edytuj</Link>
        <p className="user-offer-tile--delete" onClick={() => mutate()}>Usuń</p>
      </div>
    </>
  );
};
