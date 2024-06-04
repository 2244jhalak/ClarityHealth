import { Link } from "react-router-dom";
import useTest from "../../../hooks/useTest";


const FeaturedTest = () => {
    const [test,]=useTest();
    
    return (
        <div className="">
            <h3 className="text-3xl text-center font-semibold">Our Featured Test</h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                {
                    test.map(testItem=>
                        <div key={testItem._id} className="card w-full bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={testItem.imageUrl} alt="Test_Image" className="rounded-xl h-[180px] w-full" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{testItem.testName}</h2>
    <p>Price: ${testItem.price}</p>
    <div className="card-actions">
      <Link to={`/test/${testItem._id}`} className="btn btn-primary text-white font-bold">View Details</Link>
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






