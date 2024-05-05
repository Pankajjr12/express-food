import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await fetch(`http://localhost:3001/carts?email=${user?.email}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch cart data');
      }

      return res.json();
    },
  });

  return [cart, refetch];
};

export default useCart
