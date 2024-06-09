import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";


import { Link } from "react-router-dom";
import useBanners from "../../../hooks/useBanners";
import useAxiosSecure from "../../../hooks/useAxiosSecure";




const AllBanners = () => {
    const [banners,refetch] = useBanners();
    const axiosSecure = useAxiosSecure();
    console.log(banners);
    const handleActive=banner=>{
        const status={
            isActive:'true'
        }
        axiosSecure.patch(`/banner/${banner._id}`,status)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    // Refetch to update the UI
                    refetch();
                    
                  
                }
                
            })
            .catch(error => {
                console.error("Error updating banner status:", error);
            });
    }
    const handleDeleteItems = banner =>{
        console.log(banner._id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/banner/${banner._id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        // refetch to update the ui
                        
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${banner.name} has been deleted.`,
                            icon: "success"
                          });
    
                    }

                })
                
              
            }
          });
    }
    return (
        <div>
            

<div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>ITEM IMAGE</th>
        <th>ITEM NAME</th>
        <th>PRICE</th>
        <th>Banner Status</th>
        <th>ACTION</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {
        banners.map((banner,index)=>
            <tr key={banner._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={banner.image} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          {banner.name}
        </td>
        <td>{banner.title}</td>
        <td><button onClick={()=>handleActive(banner)} className="px-2 py-1 text-red-400 text-cenetr">{banner.isActive}</button></td>
        <th>
          <Link to={`/dashboard/updateItem/${banner._id}`}>
              <button className="btn btn-ghost btn-xl text-red-600">
                <FaEdit></FaEdit>
              </button>
          </Link>
        </th>
        <th>
          <button onClick={()=>handleDeleteItems(banner)} className="btn btn-ghost btn-xl text-red-600">
            <FaTrashAlt></FaTrashAlt>
          </button>
        </th>
      </tr>
        )
      }
      
      
    </tbody>
    
    
  </table>
</div>
            
        </div>
    );
};

export default AllBanners;