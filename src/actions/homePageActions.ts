import axios from "../utils/axiosInstance";

export const fetchCities = async () => {
    const res = await axios("./cities");

    return res;
}