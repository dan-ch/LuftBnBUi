import React, { useContext } from 'react';
import StarIcon from "@mui/icons-material/Star";
import { IOpinion } from "../../../../models/Offer";
import { useMutation } from "react-query";
import axios from "../../../../utils/axiosInstance";
import { UserContext } from "../../../../context/AuthProvider";


interface OpinionProps {
  opinion: IOpinion;
  onDelete: () => {};
}

export const Opinion: React.FC<OpinionProps> = ({opinion, onDelete}) => {
  const { userState } = useContext(UserContext);
  const { mutate } = useMutation(async () => {
    return await axios.delete(`/opinion/${opinion.id}`);
  }, {
    onSuccess: () => {
      onDelete();
    }
  } );
  return (<div className="opinion">
    <div className="opinion__author">
      <div>
        <p>{opinion.author.firstName}</p>
        <p className="opinion__post-date">{opinion.date}</p>
      </div>
      <div className="opinion__rating">{opinion.rate}/5 <StarIcon /></div>
    </div>
    <p className="opinion__comment">
      {opinion.content}
    </p>
    {userState.user?.id === opinion.author.id &&
      <p onClick={() => mutate()} className="opinion__delete-opinion">Usuń</p>
    }
  </div>);
};