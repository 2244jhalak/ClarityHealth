import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Home/Login/Login";
import Signup from "../pages/Home/Signup/Signup";
import TestDetails from "../pages/Home/TestDetails/TestDetails";
import PrivateRoute from "./PrivateRoute";






export const router = createBrowserRouter([
  
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:"/",
            element:<Home></Home>
        },
        
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signup",
          element:<Signup></Signup>
        },
        {
          path:"/test/:id",
          element:<PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/test/${params.id}`)
        }
        
      ]
      
    }
    
]);
