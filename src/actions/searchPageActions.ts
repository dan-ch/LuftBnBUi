import axios from 'utils/axiosInstance';

interface OfferParams {
  city: string;
  people: number;
  startDate: string;
  endDate: string;
}

export const fetchOffers = async (offerParams: OfferParams) => {
  const res = await axios({
    url: "./offer",
    params: offerParams
  });
  return res;
};