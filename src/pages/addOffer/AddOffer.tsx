import { CustomSelect, TextInput } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { UserActions, UserContext } from "context/AuthProvider";
import { useDropzone } from 'react-dropzone';
import { FormControlLabel, Switch } from '@mui/material';
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import { FormProvider, useForm } from "react-hook-form";
import { IaddOffer, IaddOfferWithPhotos } from "../../models/Offer";
import Button from "@mui/material/Button";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation } from "react-query";
import axios from "../../utils/axiosInstance";
import { Image } from 'models/Offer';
import LoadingButton from '@mui/lab/LoadingButton';
import { OfferForm } from "../../components/OfferForm/OfferForm";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

interface AddOfferProps {

}

export const AddOffer: React.FC<AddOfferProps> = () => {
    const [property, setProperty] = useState('');
    const [files, setFiles] = useState<Image[]>([]);
    const navigate = useNavigate();
    const { isLoading, mutate } = useMutation(async (offer: IaddOfferWithPhotos) => {
      const fData = new FormData();
      fData.append('title', offer.title);
      fData.append('city', offer.city);
      fData.append('maxPeople', offer.maxPeople.toString());
      fData.append('dailyPrice', offer.dailyPrice.toString());
      fData.append('type', offer.type!);
      fData.append('description', offer.description);
      fData.append('smoking', offer.smoking.toString());
      offer.photos.forEach((photo) => {
        fData.append("photos", photo);
      });
      const response = await axios.post('./offer', fData);
      return response;
    }, {
      onSuccess: (data) => {
        console.log(data, 'przeszlo');
        navigate('/settings');
      }
    });

    const { dispatch } = useContext(UserContext);
    const methods = useForm();
    const onSubmit = (data: IaddOffer) => {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1000,
        useWebWorker: true
      }
      const compressedPhotos = files.map(async (file) => {
        const img = await imageCompression(file, options);
        return img;
      })
      console.log(files);
      Promise.all(compressedPhotos)
        .then((result) => {
          const offerData: IaddOfferWithPhotos = {
            ...data,
            photos: result
          };
          console.log(result);
          mutate(offerData);
        })


    };

    const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        const addedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }
        ));
        setFiles(
          [...files, ...addedFiles]
        );
      }
    });

    const handleDelete = (fileName: string) => {
      console.log(files.filter((file) => file.name === fileName));
      setFiles(files.filter((file) => file.name !== fileName));
    };


    const thumbs = files?.map(file => (
      <div className="add-offer__thumb-inner" key={file.name}>
        <DeleteForeverIcon className="add-offer__delete-photo" onClick={() => handleDelete(file.name)}/>
        <img
          className="add-offer__thumb-img"
          src={URL.createObjectURL(file)}
          alt="dropzone-photo"
        />

      </div>
    ));

    useEffect(() => {
      files && files.forEach((file: Image) => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (<main className="add-offer">
      <h1>Dodaj ofertę</h1>
      <div>
        <section className="add-offer__container-dropzone">
          <div {...getRootProps({ className: 'add-offer__dropzone' })}>
            <input {...getInputProps()} />
            <DownloadIcon fontSize="large"/>
            <p>Wrzuć zdjęcia albo kilknij</p>
          </div>
          <aside className="add-offer__thumb-container">
            {thumbs}
          </aside>
        </section>
        <OfferForm isLoading={isLoading} onSubmit={onSubmit} submitButtonName="Dodaj ofertę"/>
      </div>


    </main>);
  }
;