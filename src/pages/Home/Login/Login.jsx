import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate,  validateCaptcha } from 'react-simple-captcha';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import { AuthContext } from '../../../provider/AuthProvider';


const Login = () => {
    const {signInUser} = useContext(AuthContext);
    const location=useLocation();
  const navigate=useNavigate(); 
  const from=location.state?.from?.pathname || "/";

    
    const [disabled,setDisabled]=useState(true);
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleSubmit=e=>{
        e.preventDefault();
        const form=e.target;

        
        
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password);
        signInUser(email,password)
  .then(result=>{
    console.log(result.user);
    Swal.fire({
      title: "User login successful",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
    navigate(from,{replace:true});
    
    
    
    
  })
  .catch(error=>{
    console.log(error);
    
  })
        
    }
    const handleValidate=e=>{
        const user_captcha_value=e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
   
        else {
            setDisabled(true);
        }   
    }
    return (
        <div>
        <Helmet>
        <title>Bistro Boss | Login</title>
        
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-10">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" name="password" placeholder="password" className="input input-bordered" required />
          
        </div>
        <div className="form-control">
        
          <label className="label">
          <LoadCanvasTemplate />
          </label>
          <input type="text" name="" onBlur={handleValidate} placeholder="captcha" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
        </div>
        
      </form>
      
      <p className="ml-8 mb-4 dark:text-black">New to website? Please <Link className="underline" to="/signup">Signup</Link></p>
    </div>
  </div>
</div>
        
        </div>
    );
};

export default Login;