import { FaBook, FaCalendar, FaEnvelope, FaHome, FaImage, FaImages,  FaSearch, FaUpload, FaUser, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useReservation from "../hooks/useReservation";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const Dashboard = () => {
    const {user}=useContext(AuthContext);
    const [reservation]= useReservation();
    // const [cart] = useCart();
    const [isAdmin]=useAdmin();
    
    
    
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-[tomato]">
                <ul className="menu">
                    {
                        user && isAdmin &&
                        <>
                        <li>
                        <NavLink to="/dashboard/adminHome">
                           <FaHome></FaHome>
                            Admin Home</NavLink>
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
                        <NavLink to="/dashboard/bookings">
                           <FaBook></FaBook>
                            Manage Bookings</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
                       </li>

                        </>
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
                            My Upcoming Appointments({reservation.length})</NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/result">
                           <FaUpload></FaUpload>
                            Test results</NavLink>
                        </li>
                       
                    </>
                    }
                    
                    
                    <div className="divider"></div>
                    {/* shared nav links */}
                    <li>
                        <NavLink to="/">
                           <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/Salads">
                           <FaSearch></FaSearch>
                            Our Order</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                           <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;