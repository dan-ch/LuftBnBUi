import React, { useContext } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Offer, IOpinion } from "../../../../models/Offer";
import { AddOpinion } from "../AddOpinion/AddOpinion";
import { Opinion } from "../Opinion/Opinion";
import { UserContext } from "../../../../context/AuthProvider";

interface OfferOpinionsProps {
    rateCount: number;
    opinionsCount: number;
    opinions: IOpinion[];
    refetchOpinions: () => {};
    offer: Offer;
    offerOwnerId: number;
}

export const OfferOpinions: React.FC<OfferOpinionsProps> = ({rateCount, opinionsCount, opinions, refetchOpinions, offer, offerOwnerId}) => {
  const { userState } = useContext(UserContext);
console.log(offerOwnerId)
  console.log(userState.user?.id)

  return (<section>
    {offerOwnerId !== userState.user?.id && <AddOpinion refetchOpinions={refetchOpinions} offer={offer} />}
        <div className="opinions-title">
            <p>Recenzje</p>
            <span className="offer__ratings">
                        <StarIcon/>
                        <p>{rateCount.toFixed(2)}</p>
                        <p className="offer--clickable-text">(Ilość recenzji: {opinionsCount})</p>
                    </span>
        </div>
        {
            opinions.map((opinion: IOpinion) => (
              <Opinion opinion={opinion} onDelete={refetchOpinions} key={opinion.id}/>
            ))
        }
    </section>);
};