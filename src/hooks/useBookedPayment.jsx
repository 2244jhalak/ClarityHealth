

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


import useAxiosPublic from "./useAxiosPublic";



const useBookedPayment = () => {
    // tan stack query
    const axiosPublic =useAxiosPublic();
    const {user} =useContext(AuthContext);
    const {data:payments=[],refetch}=useQuery({
        queryKey:['payments',user?.email],
        queryFn:async()=>{
            const res =await axiosPublic.get(`/payments?email=${user?.email}`);
            console.log(res.data);
            return res.data;
        }
    })
    return [payments,refetch]
};

export default useBookedPayment; 