import React from 'react';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { Link } from "react-router-dom";
import { Offer } from "models/Offer";

interface OfferTileProps {
    offer: Offer
}

export const OfferTile: React.FC<OfferTileProps> = ({offer}) => {
    return (
        <Link to={`/offer/${offer.id}`}>

            <div className="tile-offer">
                <h2>{offer.title}</h2>
                <div className="tile-offer__image">
                    <img src={offer.images[0]?.url} alt="obrazek"/>
                    <FavoriteTwoToneIcon className="tile-offer__icon" />

                </div>
                <div className="tile-offer__description">

                    <p><u>Lokalizacja:</u> {offer.city}</p>
                    <p>{offer.description}</p>
                    <p className="tile-offer__description__price-per-day"><strong>{offer.dailyPrice} zł</strong> / noc</p>
                </div>
            </div>
        </Link>
    );
};