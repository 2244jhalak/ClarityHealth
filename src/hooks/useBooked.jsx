import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./useAxiosSecure";

const useBooked = () => {
    const axiosSecure = useAxiosSecure();
    
    const {data:payment=[],refetch}=useQuery({
          queryKey:['payment'],
          queryFn:async()=>{
            const res= await axiosSecure.get('/payment');
            return res.data;
          }
    })

    return [payment,refetch];
};

export default useBooked;