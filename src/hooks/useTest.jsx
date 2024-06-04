import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTest = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data:test=[],refetch}=useQuery({
          queryKey:['test'],
          queryFn:async()=>{
            const res= await axiosPublic.get('/test');
            return res.data;
          }
    })

    return [test,refetch];
};

export default useTest;