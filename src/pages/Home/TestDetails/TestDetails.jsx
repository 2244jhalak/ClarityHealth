

import { Link, useLoaderData } from "react-router-dom";
import useBanners from "../../../hooks/useBanners";
import { useEffect, useState, useRef, useContext } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTest from "../../../hooks/useTest";

const TestDetails = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const tests = useLoaderData();
  
  const {user}=useContext(AuthContext);
  const axiosSecure= useAxiosSecure();
  const { testName, imageUrl, details, price, date, slots } = tests;

  const [banners, refetch] = useBanners();
  const [,refetchTest]=useTest();
  const [discount, setDiscount] = useState(price);
  const [hasExecuted, setHasExecuted] = useState(false);
  const finalRef = useRef(null);
  
  
  console.log(discount);
  

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!hasExecuted) {
      const banner = banners.find(banner => banner.isActive === 'true');
      const rate = banner ? banner.rate : 0;
      setDiscount(price - (price * rate) / 100);

      console.log("Function executed on page reload.");
      setHasExecuted(true);
    }
  }, [banners, price, hasExecuted]);

  const handleBooked = () => {

    const finalPrice = finalRef.current ? finalRef.current.innerText : price;
    
    
    if(user && user.email){
            
                  
                      const reservation={
                          testName,
                          image:imageUrl,
                          email:user.email,
                          details,
                          price,
                          date,
                          
                          discountPrice: parseFloat(finalPrice),
                          transactionId:'pending',
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
                    axiosSecure.patch(`/tests/${tests._id}`)
                    .then(res=>{
                        
                        
                        if(res.data.modifiedCount > 0){
                          refetchTest();
                          
                            
                          console.log(res.data);
                            
                        }
                    })
                    
    }
                 
                
                    
          
                
              
    
  };

  const handlePromo = e => {
    const banner = banners.find(banner => banner.isActive === 'true');
    const code = banner ? banner.code : '';
    const rate = banner ? banner.rate : 0;

    let finalPrice;
    if (e.target.value === code) {
      finalPrice = price - (price * rate) / 100;
    } else {
      finalPrice = price;
    }

    if (finalRef.current) {
      finalRef.current.innerText = finalPrice;
    }
  };

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
              {
                slots<=0 ?
                <button
                
                 className="btn btn-disabled text-white font-bold"
                 
                
                 
               >
                 No available slot
               </button>
               :
               <button
               
                className="btn btn-primary text-white font-bold"
                
               
                onClick={() => document.getElementById('my_modal_1').showModal()}
              >
                Book Now
              </button>

              }
             
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">{testName}</h3>
                  <p className="py-4">Price: ${price}</p>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Use Promo?</span>
                    </div>
                    <input
                      onKeyUp={handlePromo}
                      id="promo"
                      type="text"
                      placeholder='Use valid promo code from banner'
                      className="input input-bordered w-full"
                    />
                  </label>

                  <p className="py-4">
                    Final Price: $<span ref={finalRef}>{price}</span>
                  </p>
                  <div className="text-center">
                    
                    <Link to='/payment' onClick={handleBooked} className="btn btn-primary">
                      Pay
                    </Link>
                  </div>
                  <div>
                  <Elements stripe={stripePromise}>
                      
                      
                  </Elements>
            </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
