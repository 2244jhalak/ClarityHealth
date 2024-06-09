/* eslint-disable react/prop-types */


import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";




const Payment = () => {

  
  
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  

   
  
    return (
        <div>
            <h2 className="invisible">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad unde velit expedita accusantium sunt? Nisi sunt quo tenetur eum nesciunt, laborum quisquam excepturi officiis aliquid reprehenderit natus eos ratione architecto velit omnis molestiae doloribus totam possimus repudiandae voluptatum debitis illo tempore. Eveniet repellendus reprehenderit, a id consequatur ratione quas dicta quod quia et, tempora sit. Est blanditiis sit enim quaerat. Cumque, debitis! Reiciendis fuga ullam aspernatur. Laboriosam tempora nemo suscipit nihil vitae, aliquid, impedit blanditiis earum quia iste ratione nesciunt dolore, praesentium iusto odio! Laborum sint adipisci sunt ducimus optio! Deleniti saepe dolorum fugit adipisci cumque. Blanditiis magnam fugit architecto!</h2>
            
            <div>
                <Elements stripe={stripePromise}>
                     <CheckoutForm></CheckoutForm>
                      
                </Elements>
            </div>
            
        </div>
    );
};

export default Payment;