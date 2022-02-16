import React, { useEffect } from 'react';
import { OfferForm } from "../../components/OfferForm/OfferForm";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { IaddOffer, Offer as OfferModel } from "../../models/Offer";
import axios from "../../utils/axiosInstance";
import { useLocation, useNavigate } from 'react-router-dom';
import { getOfferById } from "../../actions/offerPageActions";
import { LoadingIndicator } from 'components';
import OfferCarousel from "../offer/components/OfferCarousel/OfferCarousel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface EditOfferProps {

}

export const EditOffer: React.FC<EditOfferProps> = ({}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    data: offer,
    isFetching: isOfferFetching
  }: UseQueryResult<OfferModel> = useQuery(['offer', state.id], () => getOfferById(state.id!));
  const { isLoading, mutate } = useMutation(async (offer: IaddOffer) => {
    console.log(offer.smoking)
    const fData = new FormData();
    fData.append('title', offer.title);
    fData.append('city', offer.city);
    fData.append('maxPeople', offer.maxPeople.toString());
    fData.append('dailyPrice', offer.dailyPrice.toString());
    fData.append('type', offer.type!);
    fData.append('description', offer.description);
    fData.append('smoking', offer.smoking.toString());

    const response = await axios.put(`./offer/${state.id}`, fData);
    return response;
  }, {
    onSuccess: (data) => {
      console.log(data, 'przeszlo');
      navigate("/settings")
    }
  });

  const onSubmit = (data: IaddOffer) => {
    console.log(data)
    mutate(data);
  }
  return (
    <section className="edit-offer">
      <div className="offer__nav"><ChevronLeftIcon className="search__icon" onClick={() => navigate(-1)}/><></></div>
      <OfferCarousel images={offer?.images.map(image => image.url)}/>
    {isOfferFetching ? <LoadingIndicator /> : <OfferForm isLoading={isLoading} onSubmit={onSubmit} offer={offer} submitButtonName="Edytuj ofertę"/>}
  </section>
  );
};