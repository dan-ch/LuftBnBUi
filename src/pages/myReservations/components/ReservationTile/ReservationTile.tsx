import React from 'react';
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import axios from "utils/axiosInstance";
import LoadingButton from "@mui/lab/LoadingButton";

interface ReservationTileProps {
  totalPrice: number;
  startDate: string;
  endDate: string;
  reservationId: number;
  onDelete: () => {};
}

export const ReservationTile: React.FC<ReservationTileProps> = ({ totalPrice, startDate, endDate, reservationId, onDelete}) => {
  const { mutate, isLoading} = useMutation(async () => {
    return await axios.delete(`/reservation/${reservationId}`);
  }, {
    onSuccess: () => {
      onDelete();
  }
  } );
  const today = new Date();
  const firstDay = new Date(startDate);
  return (<div className="my-reservations__reservation-tile">
    <div>
      <div className="my-reservations__totalPrice">Łączna cena za pobyt: <strong>{totalPrice} zł</strong></div>
      <p>Data przyjazdu: {startDate}</p>
      <p>Ostatni dzień: {endDate}</p>
    </div>
    {/*{today < firstDay && <Button onClick={() => mutate()}>Anuluj rezerwację</Button>}*/}
    {isLoading
      ? <LoadingButton loading variant="contained"> Submit </LoadingButton>
      : today < firstDay && <Button onClick={() => mutate()}>Anuluj rezerwację</Button>
    }
  </div>);
};