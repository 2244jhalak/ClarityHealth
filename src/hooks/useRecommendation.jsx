import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRecommendation = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data:recommendation=[],refetch}=useQuery({
          queryKey:['recommendation'],
          queryFn:async()=>{
            const res= await axiosPublic.get('/recommendation');
            return res.data;
          }
    })

    return [recommendation,refetch];
};

export default useRecommendation;