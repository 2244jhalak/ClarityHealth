import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "./useAxiosPublic";

const useBooked = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data:payment=[],refetch}=useQuery({
          queryKey:['payment'],
          queryFn:async()=>{
            const res= await axiosPublic.get('/payment');
            return res.data;
          }
    })

    return [payment,refetch];
};

export default useBooked;