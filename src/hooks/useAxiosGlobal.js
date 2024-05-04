import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3001',
});

const useAxiosGlobal= () => {
  return axiosPublic;
}

export default useAxiosGlobal;