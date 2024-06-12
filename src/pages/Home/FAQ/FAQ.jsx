/* eslint-disable react-refresh/only-export-components */

import { Helmet } from "react-helmet-async";


const FAQ = () => {
    return (
        <div className="my-10 px-10">
            <Helmet>
        <title>ClarityHealth | FAQ</title>
        
      </Helmet>
            <h2 className="my-5 text-3xl font-semibold text-center">Frequently Asked Questions</h2>
            <div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" defaultChecked /> 
  <div className="collapse-title text-xl font-medium">
  What are your hours of operation?
  </div>
  <div className="collapse-content"> 
    <p>Our diagnostic center is open from Monday to Friday, 8:00 AM to 6:00 PM, and Saturday, 8:00 AM to 2:00 PM. We are closed on Sundays and public holidays.</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  How should I prepare for my test?

  </div>
  <div className="collapse-content"> 
    <p>Preparation instructions vary depending on the test. Detailed preparation guidelines will be provided when you book your appointment.</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-base-200">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  How can I book an appointment?
  
  </div>
  <div className="collapse-content"> 
    <p>You can book an appointment online through our website</p>
  </div>
</div>
            
        </div>
    );
};

export default FAQ;