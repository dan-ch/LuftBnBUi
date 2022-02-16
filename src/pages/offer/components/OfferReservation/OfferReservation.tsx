import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { SearchContext } from "context/SearchProvider";
import { useMutation } from "react-query";
import axios from "../../../../utils/axiosInstance";
import { Reservation } from "../../../../models/Offer";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import moment from "moment";

interface OfferReservationProps {
  dailyPrice: number;
  offerId: number;
}

export const OfferReservation: React.FC<OfferReservationProps> = ({dailyPrice, offerId}) => {
  const {state} = useContext(SearchContext);
  const {startDate, endDate} = state;
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation(async () => {
    const fData = new FormData();
    fData.append('startDate', moment(state.startDate).format('YYYY-MM-DD'));
    fData.append('endDate', moment(state.endDate).format('YYYY-MM-DD'));
    fData.append('offer', offerId.toString());
    const response = await axios.post('./reservation', fData);
    return response;
  }, {
    onSuccess: () => {
      navigate('/myReservations');
    }
  });

  const handleClick = () => {
    mutate();
  };

  const countDays = (first: Date, second: Date) => {
    const difference = Math.abs(first.getTime() - second.getTime());
    const daysCount = Math.ceil(difference / (1000 * 3600 * 24) + 1);
    return daysCount
  }

  const calculateTotalPrice = (daysCount: number) => {
    return dailyPrice*daysCount;
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short', day: 'numeric'
    }

    return new Intl.DateTimeFormat("pl-PL", options).format(new Date(date));
  }

  return (
    <div className="reservation">
      <div>
          <h1 className="reservation__title">Rezerwuj</h1>
          <p>{dailyPrice}zł / noc</p>
          <p><u>{formatDate(startDate)} – {formatDate(endDate)}</u></p>
      </div>
      <div  className="reservation__total">
          <p>Łącznie: <u>{calculateTotalPrice(countDays(startDate, endDate))}zł</u></p>
        {isLoading
          ? <LoadingButton loading variant="contained"> Submit </LoadingButton>
          : <Button onClick={() => mutate()}>Rezerwuj</Button>
        }
      </div>
    </div>
  );
};