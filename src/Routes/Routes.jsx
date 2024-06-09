import {
    createBrowserRouter
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Home/Login/Login";
import Signup from "../pages/Home/Signup/Signup";
import TestDetails from "../pages/Home/TestDetails/TestDetails";
import Appointments from "../pages/Dashboard/Appointmets/Appointments"
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddBanner from "../pages/Dashboard/AddBanner/AddBanner";
import AllBanners from "../pages/Dashboard/AllBanners/AllBanners";
import AllTests from "../pages/Home/AllTests/AllTests";
import Payment from "../pages/Home/Payment/Payment";






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
          path:"/allTests",
          element:<AllTests></AllTests>
        },
        {
          path:"/payment",
          element:<Payment></Payment>,
          
        },
        {
          path:"/test/:id",
          element:<PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
          loader:({params})=>fetch(`http://localhost:5000/test/${params.id}`)
        }
        
      ]
      
    },
    {
      path:"dashboard",
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        // normal users route
        {
          path:"reservation",
          element:<Appointments></Appointments>
        },
        {
          path:"userHome",
          element:<MyProfile></MyProfile>
        },
        // admin route
        {
          path:"users",
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:"addBanner",
          element:<AdminRoute><AddBanner></AddBanner></AdminRoute>
        },
        {
          path:"allBanners",
          element:<AdminRoute><AllBanners></AllBanners></AdminRoute>
        },
      ]
    }
    
]);
