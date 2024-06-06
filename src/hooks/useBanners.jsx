import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBanners = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data:banners=[],refetch}=useQuery({
          queryKey:['banners'],
          queryFn:async()=>{
            const res= await axiosPublic.get('/banner');
            return res.data;
          }
    })

    return [banners,refetch];
};

export default useBanners;