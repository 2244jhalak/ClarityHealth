

import useReservation from "../../../hooks/useReservation";


const FeaturedTest = () => {
    const [reservation]=useReservation();
    
    return (
        <div className="">
            <h3 className="text-3xl text-center font-semibold">Our Featured Test</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {
                    reservation.map(testItem=>
                        <div key={testItem._id} className="card w-full bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={testItem.image} alt="Test_Image" className="rounded-xl h-[180px] w-full" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{testItem.testName}</h2>
    <p>{testItem.details}</p>
      <div className="space-y-2">
      <p>Price: ${testItem.price}</p>
      <p>Date: {testItem.date}</p>
      <p className="flex justify-between">Slots: {testItem.slots}</p>
      
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





