import React from "react";
import useAxiosGlobal from "./useAxiosGlobal";
import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const axiosPublic = useAxiosGlobal();
  const {data : menu = [],isPending,refetch } = useQuery({
    queryKey: ['menu'],
    queryFn: async()=> {
        const result = await axiosPublic.get('/menu');
        console.log(result.data);
        return result.data;        
    }
  })
  return [menu,isPending,refetch];
};

export default useMenu;
