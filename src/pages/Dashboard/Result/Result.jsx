import { jsPDF } from "jspdf";

import useBookedPayment from "../../../hooks/useBookedPayment";


const Result = () => {
    const [payments,]=useBookedPayment();
    const downloadPDF = (data) => {
        const doc = new jsPDF();
        doc.text("User Details", 10, 10);
        doc.text(`Test Name: ${data.name}`, 10, 20);
        doc.text(`Email: ${data.email}`, 10, 30);
        doc.text(`Appointments Date: ${data.status}`, 10, 40);
        doc.save("user-details.pdf");
    };
    
    
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
        <th>Email</th>
        
        <th>Report</th>
        
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
        <td>
            {item.email}
        </td>
        
        
        <td>
                    {
                        item.status === 'pending'?
                        <span className="text-red-600 cursor-pointer">{item.status}...</span>:
                        <button onClick={()=>downloadPDF(item)} className="btn btn-success text-white">Result</button>
                    }
                    

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

export default Result;