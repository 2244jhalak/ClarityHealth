import { FaBook, FaCalendar, FaFileAlt, FaHome, FaImage, FaImages, FaUpload, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useBookedPayment from "../hooks/useBookedPayment";

import { FaFile } from "react-icons/fa6";


const Dashboard = () => {
    
    const {user}=useContext(AuthContext);
    const [payments]= useBookedPayment();
    // const [cart] = useCart();
    const [isAdmin]=useAdmin();
    
    
    
    
    return (
        <div className="flex lg:flex-row md:flex-row flex-col">
            <div className="lg:w-1/5 md:w-1/5 w-full py-5 my-5 bg-orange-300 text-black rounded-lg">
                <ul className="menu">
                    {
                        user && isAdmin &&
                        <div className="flex lg:flex-col flex-col md:flex-col">
                        
                        
                        <li>
                        <NavLink to="/dashboard/addTest">
                           <FaFile></FaFile>
                            Add Test</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/allTests">
                           <FaFileAlt></FaFileAlt>
                            All Tests</NavLink>
                       </li>
                        <li>
                        <NavLink to="/dashboard/addBanner">
                           <FaImage></FaImage>
                            Add Banner</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/allBanners">
                           <FaImages></FaImages>
                            All Banners</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/booked">
                           <FaBook></FaBook>
                            Reservation</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
                       </li>
                       

                        </div>
}
                    
                    {
                       user && !isAdmin &&
                        <>
                        <li>
                        <NavLink to="/dashboard/userHome">
                           <FaUser></FaUser>
                            My Profile</NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/reservation">
                           <FaCalendar></FaCalendar>
                            My Upcoming Appointments({payments.length})</NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/result">
                           <FaUpload></FaUpload>
                            Test results</NavLink>
                        </li>
                       
                    </>
                    }
                    
                    
                    <div className="divider bg-white h-1"></div>
                    {/* shared nav links */}
                    <li>
                        <NavLink to="/">
                           <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    
                </ul>
            </div>
            <div className="p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;