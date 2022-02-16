import React from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../../../components";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import axios from "../../../../utils/axiosInstance";
import { IAddOpinion, Offer } from "models/Offer";

interface AddOpinionProps {
  offer: Offer;
  refetchOpinions: () => {}
}

export const AddOpinion: React.FC<AddOpinionProps> = ({refetchOpinions, offer}) => {
  const [value, setValue] = React.useState<number>(2);
  const { isLoading, mutate } = useMutation(async (opinion: IAddOpinion) => {
    const fData = new FormData();
    fData.append('content', opinion.content.toString());
    fData.append('rate', opinion.rate.toString());
    fData.append('offer', opinion.offer.toString());

    const response = await axios.post('./opinion', fData);
    console.log(response);
    return response;
  }, {
    onSuccess: () => {
      refetchOpinions()
    }
  });

  const methods = useForm();

  const onSubmit = (data: any) => {
    const opinion: IAddOpinion = {
      content: data.opinion,
      rate: value,
      offer: offer.id
    }

    mutate(opinion);
  }

  return (<article>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}  className="add-opinion-form">
        <div className="opinions-title">
          <h3>Co myślisz o tym obiekcie?</h3>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                setValue(newValue as number);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </Box>
        </div>
        <TextInput label="Dodaj opinię" name="opinion" placeholder="Miejsce na opinię..." type="text" variant="outlined" multiline={true} />
        <Button type="submit">Dodaj</Button>
      </form>
    </FormProvider>
  </article>);
};