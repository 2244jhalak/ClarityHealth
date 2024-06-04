import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useReservation from "../../../hooks/useReservation";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";





const TestDetails = () => {
    const tests = useLoaderData();
    
   
    const {testName,imageUrl,details,price,date,slots} = tests;
   
    
    const {user} = useContext(AuthContext);
    const navigate=useNavigate();
    const location=useLocation();
    const axiosSecure=useAxiosSecure();
    
    const [,refetch] = useReservation();
    const handleAddToReservation=tests=>{
        console.log(tests.slots);
    
        if(user && user.email){
            
            if(tests.slots > 0){
                console.log(slots);
                const reservation={
                    testName,
                    image:imageUrl,
                    email:user.email,
                    details,
                    price,
                    date,
                    slots,
                    reportStatus: 'pending'
                    
        
                  }
                  axiosSecure.post('/reservation',reservation)
                  .then(res=>{
                    console.log(res.data);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${testName} is successfully added to reservation list`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    refetch();
                  })
                  // patch
              axiosSecure.patch(`/test/${tests._id}`)
              .then(res=>{
                  
                  
                  if(res.data.modifiedCount > 0){
                    window.location.reload();
                      
                    console.log(res.data);
                      
                  }
              })
              
            }
            else{
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Sorry, ${testName} has no available slots`,
                    showConfirmButton: false,
                    timer: 1500
                });
              }
          
              
    
          }
        else{
          Swal.fire({
            title: "You are not logged in",
            text: "Please login to add to the cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, login"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login',{state:{from:location}});
            }
          });
        }
        
      }
    return (
        <div>
            <div className="hero min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img src={imageUrl} className="w-1/2 h-[300px] rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">{testName}</h1>
      <p className="py-6">{details}</p>
      <div className="space-y-3">
      <p>Price: ${price}</p>
      <p>Date: {date}</p>
      <p className="flex justify-between">Slots: {slots}</p>
      <button onClick={()=>handleAddToReservation(tests)} className="btn btn-primary text-white font-bold">Book Now</button>
      </div>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default TestDetails;