import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useActivity = () => {
    
    const {user ,loading} =useContext(AuthContext);
    console.log(user);
    const axiosSecure=useAxiosSecure();
    const {data:isBlocked=[],isPending: isBlockedLoading} =useQuery({
        queryKey:[user?.email,'isBlocked'],
        enabled:loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/blocked/${user.email}`);
            console.log(res.data);
            return res.data?.blocked;
        }
    })
    return [isBlocked,isBlockedLoading];
        
        
};

export default useActivity;