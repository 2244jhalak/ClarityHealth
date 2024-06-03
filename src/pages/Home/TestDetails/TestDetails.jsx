import { useLoaderData } from "react-router-dom";


const TestDetails = () => {
    const test = useLoaderData();
    const {testName,imageUrl,details,price,date,slots} = test;
    console.log(testName);
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
      <p className="flex justify-between">Slots: <span>{slots[0]}</span> <span>{slots[1]}</span> <span>{slots[2]}</span></p>
      <button className="btn btn-primary text-white font-bold">Add To Cart</button>
      </div>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default TestDetails;