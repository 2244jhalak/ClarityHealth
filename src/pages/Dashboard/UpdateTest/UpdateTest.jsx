import { FaImage } from "react-icons/fa";

import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateTest = () => {
    const test = useLoaderData();
    console.log(test);
    
    const { register, handleSubmit,reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit =async (data) => {
        // image upload to imgbb and then get an url
        const imageFile = {image:data.image[0]};
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers:{
                'content-Type':'multipart/form-data'
            }
        });
        if(res.data.success){
          // now send the menu item data to the server with the image url
          const testItem={
            testName :data.testName,
            imageUrl:res.data.data.display_url,
            details:data.details,
            price:parseInt(data.price),
            date:data.date,
            slots:parseInt(data.slots),
          }
          //
          const testRes = await axiosSecure.patch(`/test/${test._id}`,testItem);
          console.log(testRes.data);
          if(testRes.data.modifiedCount>0){
            // show success popup
            reset();
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: `${data.testName} is updated to the test list`,
              showConfirmButton: false,
              timer: 1500
            });
          } 
        }
        console.log(res.data);
    }

    return (
        <div>
            
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
      
      <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Test Name*</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Test Name" 
 
  
  {...register("testName",{required:true})}
  className="input input-bordered w-full" />
 
</label>
<div className="flex gap-6">
    
   
    <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Price*</span>
    
  </div>
  <input 
  type="number" 
  placeholder="Price" 
  
  {...register("price",{required:true})}
  className="input input-bordered w-full" />
 
</label>

<label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Slots*</span>
    
  </div>
  <input 
  type="number" 
  placeholder="Slots" 
  
  {...register("slots",{required:true})}
  className="input input-bordered w-full" />
 
</label>
    {/* Coupon Code Rate */}
    <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Date*</span>
    
  </div>
  <input 
  type="date" 
  placeholder="Date" 
 
  {...register("date",{required:true})}
  className="input input-bordered w-full" />
 
</label>

</div>
{/*Description*/}
<label className="form-control">
  <div className="label">
    <span className="label-text">Details*</span>
    
  </div>
  <textarea {...register("details",{required:true})}
   
   className="textarea textarea-bordered h-24" placeholder="Details"></textarea>
  
</label>
<label className="form-control w-full my-6">
    <input {...register("image",{required:true})}
    
     type="file" className="file-input w-full max-w-xs" />

</label>

<button className="btn">
    Update Test <FaImage className="ml-4"></FaImage>
</button>
      
      
    </form>

            </div>
            
        </div>
    );
};

export default UpdateTest;