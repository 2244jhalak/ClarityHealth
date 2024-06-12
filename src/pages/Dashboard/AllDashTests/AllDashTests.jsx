import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useTest from "../../../hooks/useTest";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const AllDashTests = () => {
    
    const [test,refetch] = useTest();
    const axiosSecure = useAxiosSecure()

    const handleDeleteTest = item =>{
        console.log(item._id);
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
                axiosSecure.delete(`/test/${item._id}`)
                .then(res=>{
                    if(res.data.deletedCount > 0){
                        // refetch to update the ui
                        
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${item.testName} has been deleted.`,
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
        <th>TEST IMAGE</th>
        <th>TEST NAME</th>
        <th>PRICE</th>
        <th>ACTION</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
      {
        test.map((item,index)=>
            <tr key={item._id}>
        <th>
          {index+1}
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.imageUrl} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        <td>
          {item.testName}
        </td>
        <td>{item.price}</td>
        <th>
          <Link to={`/dashboard/test/${item._id}`}>
              <button className="btn btn-ghost btn-xl text-red-600">
                <FaEdit></FaEdit>
              </button>
          </Link>
        </th>
        <th>
          <button onClick={()=>handleDeleteTest(item)} className="btn btn-ghost btn-xl text-red-600">
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

export default AllDashTests;