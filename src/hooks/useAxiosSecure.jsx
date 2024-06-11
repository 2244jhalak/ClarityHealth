// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
// import axios from "axios";




// const axiosSecure=axios.create({
//        baseURL:'http://localhost:5000',
       
// })

// const useAxiosSecure = () => {
//         const navigate = useNavigate();
//         const {logOut} = useContext(AuthContext);
//         axiosSecure.interceptors.request.use(function (config) {
//             const token = localStorage.getItem('access-token');
            
//             config.headers.authorization=`Bearer ${token}`;
//             return config;
//         },function (error){
//             return Promise.reject(error);
        
//         })

//         // intercepts 401 and 403 status
//         axiosSecure.interceptors.response.use(function (response){
//             return response;
//         },async (error)=>{
//             const status = error.response.status;
           
//             // for 401 or 403 logout the user and move the user to the login
//             if(status === 401 || status === 403){
               
//                await logOut();
//                navigate('/login')
               
//             }
            
//             return Promise.reject(error);
//         })

    
//     return axiosSecure;
// };

// export default useAxiosSecure;

import {  useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const status = error.response?.status;
        
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
