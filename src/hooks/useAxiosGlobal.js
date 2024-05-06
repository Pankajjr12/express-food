import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'https://express-food-server.onrender.com/',
});

const useAxiosGlobal= () => {
  return axiosPublic;
}

export default useAxiosGlobal;