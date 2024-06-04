import { useContext } from "react";

import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';


import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const location=useLocation();
    console.log(location)
    if(loading){
         
          return <div className="text-center pt-20">
               <span className="loading loading-ball loading-lg"></span>
           </div>    
}
    if(user){
        return children;
    }
    else{
        
        
        return <Navigate to='/login' state={{from:location}} replace={true}></Navigate>
    }
    
       

    
};
PrivateRoute.propTypes = {
    
    children: PropTypes.node,
    
}

export default PrivateRoute;