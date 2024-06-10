

import useBookedPayment from "../../../hooks/useBookedPayment";



const FeaturedTest = () => {
    const [payments]=useBookedPayment();
    console.log(payments);
    
    return (
        <div className="">
            <h3 className="text-3xl text-center font-semibold">My Featured Test</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {
                    payments.map(testItem=>
                        <div key={testItem._id} className="card w-full bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={testItem.image[0]} alt="Test_Image" className="rounded-xl h-[180px] w-full" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{testItem.name[0]}</h2>
    <p>{testItem.details}</p>
      <div className="space-y-2">
      
      <p>Date: {testItem.date}</p>
      
      
      </div>
    
  </div>
</div>
                    )
                }
            </div>   
            
        </div>
    );
};

export default FeaturedTest;





