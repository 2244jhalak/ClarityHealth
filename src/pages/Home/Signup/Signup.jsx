import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";



import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Signup = () => {
    const {data:districts=[]}=useQuery({
        queryKey:['districts'],
        queryFn:async()=>{
          const res= await axiosPublic.get('/districts');
          return res.data;
        }
    })
    
  const {createUser,updateUserProfile} = useContext(AuthContext);
  const axiosPublic=useAxiosPublic();
  const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {

        createUser(data.email,data.password)
        .then(result=>{
          const loggedUser=result.user;
          console.log(loggedUser);
          updateUserProfile(data.name,data.photoURL)
          .then(() => {
            const userInfo={
              name:data.name,
              email:data.email
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
              if(res.data.insertedId){
                console.log('user profile info updated');
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate("/");

              }
            })
            
          }).catch((error) => {
            console.log(error);
          });
        })
        .catch(error=>{
          console.log(error);
          
        })
    }
    
    return (
        <>
        <Helmet>
        <title>Bistro Boss | Signup</title>
        
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signup now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name="name" {...register("name",{ required: true })} className="input input-bordered"/>
          {errors.name && <span className="text-red-600">Name is required</span>}
        </div>
      <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" placeholder="photo" name="photoURL" {...register("photo",{ required: true })} className="input input-bordered"/>
          {errors.photo && <span className="text-red-600">Photo is required</span>}
        </div>
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" {...register("email",{ required: true })} className="input input-bordered"/>
          {errors.email && <span className="text-red-600">Email is required</span>}
        </div>
        <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">District</span>
    
  </div>
  <select defaultValue="default" {...register("district",{required:true})}
        className="select select-bordered w-full"
      >
        <option disabled value="default">Select your district</option>
        {
            districts.map(district=><option key={district._id} value={district.name}>{district.name}</option>)
        }
        
        
        
      </select>
 
</label>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" name="password" {...register("password",{ required: true ,minLength:6,maxLength:20,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/})} className="input input-bordered"/>
          {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-red-600">Password must be 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-red-600">Password must be less than 20 characters</span>}
          {errors.password?.type === "pattern" && <span className="text-red-600">Password must be a number,one uppercase and one lowercase</span>}
         
        </div>
        <div className="form-control mt-6">
          <input type="submit" value="Signup" className="btn btn-primary"></input>
        </div>
      </form>
            
      <p className="ml-8 mb-4 dark:text-black">Already have an account? Please <Link className="underline" to="/login">Login</Link></p>
    </div>
  </div>
</div>
        </>
    );
};

export default Signup;