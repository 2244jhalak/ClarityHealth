/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const [isAdmin,isAdminLoading]=useAdmin();
    const location=useLocation();
    console.log(location)
    if(loading || isAdminLoading){
         
          return <div className="text-center pt-20">
               <span className="loading loading-ball loading-lg"></span>
           </div>    
}
    if(user && isAdmin){
        return children;
    }
    else{
        
        
        return <Navigate to='/login' state={{from:location}} replace={true}></Navigate>
    }
};

export default AdminRoute;