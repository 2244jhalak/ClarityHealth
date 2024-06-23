import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";



import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`



const Signup = () => {
    const axiosPublic=useAxiosPublic();
  const axiosSecure=useAxiosSecure();

    const {data:districts=[]}=useQuery({
        queryKey:['districts'],
        queryFn:async()=>{
          const res= await axiosPublic.get('/districts');
          return res.data;
        }
    })
    const {data:upazillas=[]}=useQuery({
        queryKey:['upazillas'],
        queryFn:async()=>{
          const res= await axiosPublic.get('/upazillas');
          return res.data;
        }
    })
    
    
  const {createUser,updateUserProfile} = useContext(AuthContext);
  
  const navigate=useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit =async (data) => {
        
        // image upload to imgbb and then get an url
        const imageFile = {image:data.image[0]};
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-Type':'multipart/form-data'
            }
        });

        if(data.password===data.confirmPassword){
            createUser(data.email,data.password)
            .then(result=>{
                const loggedUser=result.user;
                console.log(loggedUser);
                updateUserProfile(data.name,data.photoURL)
               .then(async() => {
            
                   if(res.data.success){
                   // now send the menu item data to the server with the image url
                       const userInfo={
                           name :data.name,
                           email:data.email,
                           password:data.password,
                           confirmPassword:data.confirmPassword,
                           blood:data.blood,
                           district:data.district,
                           upazilla:data.upazilla,
                           
                           image:res.data.data.display_url,
                           status:'active'
                       }
                
                
                       const userRes = await axiosSecure.post('/users',userInfo);
                       console.log(userRes.data);
                       if(userRes.data.insertedId){
                         // show success popup
                         reset();
                         Swal.fire({
                           position: "bottom-end",
                           icon: "success",
                           title: `${data.email} is added to the users database`,
                           showConfirmButton: false,
                           timer: 1500
                         });
                         navigate("/");
                       }
            }

           
            
          
        })
        .catch(error=>{
          console.log(error);
          
        })
        
    
    })
        }
        else{
            alert('something wrong');
        }
}
    
    return (
        <>
        <Helmet>
        <title>ClarityHealth | Signup</title>
        
      </Helmet>
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Signup now!</h1>
      
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
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" {...register("email",{ required: true })} className="input input-bordered"/>
          {errors.email && <span className="text-red-600">Email is required</span>}
        </div>
        <div className="form-control">
      <label className="form-control w-full my-6">
      <span className="label-text">Avatar</span>
    <input {...register("image",{required:true})} type="file" className="file-input w-full max-w-xs" />

</label>
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
<label className="form-control w-full mb-6">
  <div className="label">
    <span className="label-text">Upazilla</span>
    
  </div>
  <select defaultValue="default" {...register("upazilla",{required:true})}
        className="select select-bordered w-full"
      >
        <option disabled value="default">Select your upazilla</option>
        {
            upazillas.map(upazilla=><option key={upazilla._id} value={upazilla.name}>{upazilla.name}</option>)
        }
        
        
        
      </select>
 
</label>
<label className="form-control w-full mb-6">
  <div className="label">
    <span className="label-text">Blood Group</span>
    
  </div>
  <select defaultValue="default" {...register("blood",{required:true})}
        className="select select-bordered w-full"
      >
        <option disabled value="default">Select your blood group</option>
        
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        
        
        
        
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input type="text" placeholder="confirm password" name="confirmPassword" {...register("confirmPassword",{ required: true ,minLength:6,maxLength:20,pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/})} className="input input-bordered"/>
          {errors.password?.type === "required" && <span className="text-red-600">Confirm Password is required</span>}
          
         
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