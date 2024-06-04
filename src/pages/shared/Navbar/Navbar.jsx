
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";

import { RiReservedFill } from "react-icons/ri";
import useReservation from "../../../hooks/useReservation";



const Navbar = () => {
//   const [isAdmin] = useAdmin();
    const [reservation] = useReservation();
    
    const {user,logOut} = useContext(AuthContext);
    const logOutUser=()=>{
      logOut();
      
    }
    const navOptions=<div className="flex items-center">
    <li><Link to='/'>Home</Link></li>
    <li>
      <Link to="/dashboard/cart">
      <button className="btn">
        <RiReservedFill></RiReservedFill>
  
        <div className="badge badge-secondary">
          +{reservation.length}
        </div>
      </button>

      </Link>
      

    </li>
    {/* <li><Link to='/menu'>Our Menu</Link></li>
    <li><Link to='/order/Salads'>Order</Link></li>
    {user && isAdmin && <li><Link to="/dashboard/adminHome">Dashboard</Link></li>}
    {user && !isAdmin && <li><Link to="/dashboard/userHome">Dashboard</Link></li>}
    <li>
      <Link to="/dashboard/cart">
      <button className="btn">
        <FaShoppingCart></FaShoppingCart>
  
        <div className="badge badge-secondary">
          +{cart.length}
        </div>
      </button>

      </Link>
      

    </li>
    
    {
      user?
      
      <li onClick={logOutUser}><Link>Log Out</Link></li>
      :
      
      <li><Link to='/login'>Login</Link></li>
       
      
      
      
    } */}
    

    
    </div>
    
    return (
        <div className="">
            <div className="navbar fixed text-white bg-black z-10 bg-opacity-30 max-w-screen-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navOptions}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">ClarityHealth</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navOptions}
   
      
    </ul>
  </div>
  <div className="navbar-end">
    {
      user?
         
         
         <button onClick={logOutUser} className="btn btn-ghost text-white font-bold">Logout</button>
         :
         <Link to='/login'>
            <p className="btn font-bold btn-primary text-white">Login</p>
         </Link>
    }

   
    
  </div>
</div>
            
        </div>
    );
};

export default Navbar;