import { Link } from "react-router-dom";
import useTest from "../../../hooks/useTest";


const AllTests = () => {
    const [test]= useTest();
    return (
        <div className="">
            <h2 className="invisible">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad unde velit expedita accusantium sunt? Nisi sunt quo tenetur eum nesciunt, laborum quisquam excepturi officiis aliquid reprehenderit natus eos ratione architecto velit omnis molestiae doloribus totam possimus repudiandae voluptatum debitis illo tempore. Eveniet repellendus reprehenderit, a id consequatur ratione quas dicta quod quia et, tempora sit. Est blanditiis sit enim quaerat. Cumque, debitis! Reiciendis fuga ullam aspernatur. Laboriosam tempora nemo suscipit nihil vitae, aliquid, impedit blanditiis earum quia iste ratione nesciunt dolore, praesentium iusto odio! Laborum sint adipisci sunt ducimus optio! Deleniti saepe dolorum fugit adipisci cumque. Blanditiis magnam fugit architecto!</h2>
            <h2 className="text-center font-semibold text-3xl mb-5">All Tests</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                {
                    test.map(testItem=>
                        <div key={testItem._id} className="card w-96 bg-base-100 shadow-xl">
  <figure><img className="w-full h-[250px]" src={testItem.imageUrl} alt="Test_Item" /></figure>
  <div className="card-body">
    <h2 className="card-title">{testItem.testName}</h2>
    <p>Price: ${testItem.price}</p>
    <div className="card-actions justify-end">
      <Link to={`/test/${testItem._id}`} className="btn btn-outline">View Details</Link>
    </div>
  </div>
</div>
                    )
                }
            </div>
            

            
        </div>
    );
};

export default AllTests;