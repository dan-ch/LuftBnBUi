import axios from "../utils/axiosInstance";

export const getOfferById = async (id: string) => {
  const data = await axios.get(`./offer/${id}`, {
    params: {
      withRatings: true
    }
  })
  return await data.data
}

export const getOfferOwner = async (id: string) => {
  const data = await axios.get(`./offer/${id}/owner`)
  return await data.data
}

export const getOfferReservations = async (id: string) => {
  const data = await axios.get(`./offer/${id}/reservations`)
  return await data.data
}

export const getOfferOpinions = async (id: string) => {
  const data = await axios.get(`./offer/${id}/opinions`)
  return await data.data
}
