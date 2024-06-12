
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";



import useAdmin from "../../../hooks/useAdmin";





const Navbar = () => {
  const {user,logOut} = useContext(AuthContext);
    const logOutUser=()=>{
      logOut();
      
    }
  const [isAdmin] = useAdmin();
 
  

 
    
    
    
    const navOptions=<div className="flex items-center">
    <li><Link to='/'>Home</Link></li>
    
    
    {user && isAdmin && <li><Link to="/dashboard/users">Dashboard ({isAdmin && 'Admin'})</Link></li>}
    {user && !isAdmin && <li><Link to="/dashboard/reservation">Dashboard ({user.displayName})</Link></li>}

    <li><Link to='/faq'>FAQ</Link></li>
    <li><Link to='/quotes'>Quotes</Link></li>
    <li><Link to='/partner'>Our Partner</Link></li>
    
    
    
    

    
    </div>
    
    return (
        <div className="">
            <div className="navbar text-neutral-content bg-neutral z-10 max-w-screen-xl">
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