

import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data:users=[],refetch}=useQuery({
      queryKey:['users'],
      queryFn:async()=>{
          const res =await axiosSecure.get('/users');
          
          return res.data;
      }
  })
    
    
    const handleActive=user=>{
      
      axiosSecure.patch(`users/blocked/${user._id}`)
          .then(res => {
              if (res.data.modifiedCount > 0) {
                  // Refetch to update the UI
                  refetch();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is Blocked By Admin!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  
                
              }
              
          })
          .catch(error => {
              console.error("Error updating banner status:", error);
          });
  }
  
    const handleMakeAdmin=user=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res=>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.email} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }
    
    
    
    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users : {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      
      {
        users.map((user,index)=><tr key={user._id}>
            <th>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            {
                user.role==='admin'?'Admin':<button
                 onClick={()=>handleMakeAdmin(user)} className="btn btn-lg bg-orange-500">
                <FaUsers className="text-white text-2xl"></FaUsers>
              </button>
            }

            </td>
            <td>
              
            <button onClick={()=>handleActive(user)} className="btn btn-ghost btn-xl">
               {
                user.status==='active'?<span className="text-green-600">{user.status}</span>:<span className="text-red-600">{user.status}</span>
               }
          </button>
                  
            </td>
          </tr>)
      }
      
    </tbody>
  </table>
</div>
            
        </div>
    );
};

export default AllUsers;