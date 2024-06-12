import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useBookedPayment from "../../../hooks/useBookedPayment";


const Appointments = () => {
    const [payments,refetch]=useBookedPayment();
    
    const axiosSecure = useAxiosSecure();
    const handleDelete=id=>{
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
              
               axiosSecure.delete(`/payments/${id}`)
                  .then(res=>{
                     if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your appointment has been deleted.",
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
        <th>Image</th>
        <th>Name</th>
        <th>Appointment Date</th>
        
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        payments.map((item,index)=>
            <tr key={item._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image[0]} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          {item.name[0]}
        </td>
        <td>{item.date}</td>
        
        
        <td>
          <button onClick={()=>handleDelete(item._id)} className="btn btn-ghost btn-xl text-red-600">
            <FaTrashAlt></FaTrashAlt>
          </button>
        </td>
      </tr>
        )
      }
      
      
    </tbody>
    
    
  </table>
</div>
        </div>


        

    );
};

export default Appointments;