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
import Reservation from "../pages/Dashboard/Reservation/Reservation";

import UserDetails from "../pages/Dashboard/UserDetails/UserDetails";
import AddTest from "../pages/Dashboard/AddTest/AddTest";
import UpdateTest from "../pages/Dashboard/UpdateTest/UpdateTest"
import AllDashTests from "../pages/Dashboard/AllDashTests/AllDashTests";
import Result from "../pages/Dashboard/Result/Result";
import FAQ from "../pages/Home/FAQ/FAQ";
import Quotes from "../pages/Home/Quotes/Quotes";
import Partner from "../pages/Home/Partner/Partner";






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
            path:"/faq",
            element:<FAQ></FAQ>
        },
        {
            path:"/quotes",
            element:<Quotes></Quotes>
        },
        {
            path:"/partner",
            element:<Partner></Partner>
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
          path:"/users/:id",
          element:<UserDetails></UserDetails>,
          loader:({params})=>fetch(`https://b9a12-server-side-2244jhalak.vercel.app/users/${params.id}`)
        },
        {
          path:"/tests/:id",
          element:<PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
          loader:({params})=>fetch(`https://b9a12-server-side-2244jhalak.vercel.app/tests/${params.id}`)
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
        {
          path:"result",
          element:<Result></Result>
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
        {
          path:"addTest",
          element:<AdminRoute><AddTest></AddTest></AdminRoute>
        },
        {
          path:"test/:id",
          element:<AdminRoute><UpdateTest></UpdateTest></AdminRoute>,
          loader:({params})=>fetch(`https://b9a12-server-side-2244jhalak.vercel.app/test/${params.id}`)

        },
        {
          path:"allTests",
          element:<AdminRoute><AllDashTests></AllDashTests></AdminRoute>
        },
        {
          path:"booked",
          element:<AdminRoute><Reservation></Reservation></AdminRoute>
        }
      ]
    }
    
]);
