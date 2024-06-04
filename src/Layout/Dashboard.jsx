import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";





const Dashboard = () => {
    const {user} =useContext(AuthContext)
    const [cart] = useCart();
    const [isAdmin]=useAdmin();
    
    
    
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
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
                        <NavLink to="/dashboard/addItems">
                           <FaUtensils></FaUtensils>
                            Add Items</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/manageItems">
                           <FaList></FaList>
                            Manage Items</NavLink>
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
                    {user && !isAdmin &&
                        <>
                        <li>
                        <NavLink to="/dashboard/userHome">
                           <FaHome></FaHome>
                            User Home</NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/reservation">
                           <FaCalendar></FaCalendar>
                            Reservation</NavLink>
                        </li>
                        <li>
                        <NavLink to="/dashboard/review">
                           <FaAd></FaAd>
                            Add a review</NavLink>
                        </li>
                       <li>
                        <NavLink to="/dashboard/paymentHistory">
                           <FaList></FaList>
                            Payment History</NavLink>
                       </li>
                       <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                            My Cart({cart.length})</NavLink>
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