import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";



const useReservation = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const {user} =useContext(AuthContext);
    const {data:reservation=[],refetch}=useQuery({
        queryKey:['reservation',user?.email],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/reservation?email=${user?.email}`);
            return res.data;
        }
    })
    return [reservation,refetch]
};

export default useReservation;     