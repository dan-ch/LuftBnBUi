import React, { useState } from 'react';
import { CustomSelect, TextInput } from "../index";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import { FormProvider, useForm } from "react-hook-form";
import { IaddOffer, IaddOfferWithPhotos, Offer, PropertyType } from "../../models/Offer";
import { FormSwitch } from "../FormSwitch/FormSwitch";

interface OfferFormProps {
  isLoading: boolean;
  onSubmit: (data: IaddOfferWithPhotos | IaddOffer) => void;
  offer?: Offer;
  submitButtonName: string;
}

const propertyTypes = [
  {
    value: "HOME",
    label: "Dom"
  },
  {
    value: "HOSTEL",
    label: "Hostel"
  },
  {
    value: "HOTEL",
    label: "Hotel"
  },
  {
    value: "APARTMENT",
    label: "Apartament"
  }
];


export const OfferForm: React.FC<OfferFormProps> = ({isLoading, onSubmit, offer, submitButtonName}) => {
  const [property, setProperty] = useState<PropertyType | string>(offer?.type);
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="add-offer__form">
        <TextInput label="Tytuł oferty" name="title" placeholder="Wprowadź nazwę oferty" type="text"
                   variant="outlined" value={offer?.title}/>
        <TextInput label="Nazwa miasta" name="city" placeholder="Wprowadź nazwę miasta" type="text"
                   variant="outlined" value={offer?.city}/>
        <TextInput label="Ilość miejsc" name="maxPeople" placeholder="Wprowadź ilość miejsc" type="number"
                   variant="outlined" numberProps={{ min: "1", max: "10", step: "1" }}   value={offer?.maxPeople}/>
        <TextInput label="Cena za noc" name="dailyPrice" placeholder="Wprowadź cenę za noc" type="number"
                   variant="outlined" value={offer?.dailyPrice}/>
        <CustomSelect name="type" menuItems={propertyTypes} value={property} setValue={setProperty}
                      label="Wybierz nieruchomość"/>
        <TextInput label="Opis" name="description" placeholder="Wprowadź opis" type="number" variant="outlined"
                   multiline={true}  value={offer?.description}/>
        <span> <p>Można palić w środku?</p><FormSwitch name="smoking" checked={offer?.smoking} label={<SmokingRoomsIcon />} /></span>
        {
          isLoading ? <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton> : <Button type="submit">{submitButtonName}</Button>
        }
      </form>

    </FormProvider>
  );
};