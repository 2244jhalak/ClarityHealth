import { useContext } from "react";

import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useReservation = () => {
    // tan stack query
    const axiosPublic =useAxiosPublic();
    const {user} =useContext(AuthContext);
    const {data:reservation=[],refetch}=useQuery({
        queryKey:['reservation',user?.email],
        queryFn:async()=>{
            const res =await axiosPublic.get(`/reservation?email=${user?.email}`);
            return res.data;
        }
    })
    return [reservation,refetch]
};

export default useReservation;     