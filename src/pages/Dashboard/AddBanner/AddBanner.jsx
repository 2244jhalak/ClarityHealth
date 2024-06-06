import { useForm } from "react-hook-form";

import { FaImage } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddBanner = () => {
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
          const bannerItem={
            name :data.name,
            title:data.title,
            description:data.description,
            code:data.code,
            rate:parseFloat(data.rate),
            
            image:res.data.data.display_url,
            isActive:'false'
          }
          //
          const bannerRes = await axiosSecure.post('/banner',bannerItem);
          console.log(bannerRes.data);
          if(bannerRes.data.insertedId){
            // show success popup
            reset();
            Swal.fire({
              position: "bottom-end",
              icon: "success",
              title: `${data.name} is added to the banner`,
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
    <span className="label-text">Name*</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Name" 
  {...register("name",{required:true})}
  className="input input-bordered w-full" />
 
</label>
<div className="flex gap-6">
    
    {/* title */}
    <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Title*</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Title" 
  {...register("title",{required:true})}
  className="input input-bordered w-full" />
 
</label>
{/* Coupon Code Name */}
<label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Coupon Code Name*</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Coupon Code Name" 
  {...register("code",{required:true})}
  className="input input-bordered w-full" />
 
</label>
    {/* Coupon Code Rate */}
    <label className="form-control w-full my-6">
  <div className="label">
    <span className="label-text">Coupon Code Rate*</span>
    
  </div>
  <input 
  type="text" 
  placeholder="Coupon Code Rate" 
  {...register("rate",{required:true})}
  className="input input-bordered w-full" />
 
</label>

</div>
{/*Description*/}
<label className="form-control">
  <div className="label">
    <span className="label-text">Description*</span>
    
  </div>
  <textarea {...register("description",{required:true})} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
  
</label>
<label className="form-control w-full my-6">
    <input {...register("image",{required:true})} type="file" className="file-input w-full max-w-xs" />

</label>

<button className="btn">
    Add Image <FaImage className="ml-4"></FaImage>
</button>
      
      
    </form>

            </div>
            
        </div>
    );
};

export default AddBanner;