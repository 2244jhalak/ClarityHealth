


// import { useState, useEffect } from "react";
// import { FaTrashAlt } from "react-icons/fa";
// import useBooked from "../../../hooks/useBooked";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const Reservation = () => {
//   const [payment,refetch] = useBooked();
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchValue, setSearchValue] = useState("");
//   const [isSearchPerformed, setIsSearchPerformed] = useState(false);
//   const axiosSecure=useAxiosSecure();

//   useEffect(() => {
//     setFilteredData(payment); // Set initial data
//   }, [payment]);

//   const handleSearch = () => {
//     setIsSearchPerformed(true);
//     if (searchValue.trim() === "") {
//       setFilteredData(payment);
//     } else {
//       const newData = payment.filter(data => data.email.toLowerCase() === searchValue.toLowerCase());
//       setFilteredData(newData);
//     }
//   };
//   const handleReport=id=>{
//     const result=document.getElementById('report');
//     const report={
//         status:`${result.value}`
//     }
//     console.log(report.status,id)
//     axiosSecure.patch(`/payment/${id}`,report)
//         .then(res => {
//             if (res.data.modifiedCount > 0) {
//                 // Refetch to update the UI
//                 refetch();
                
              
//             }
            
//         })
//         .catch(error => {
//             console.error("Error updating report status:", error);
//         });
// }

//   return (
//     <div>
//       <div className="text-center my-5">
//         <input
//           className="border-2 border-black py-3 px-5 rounded-lg"
//           type="text"
//           id="search"
//           placeholder="Search by user email"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//         <button onClick={handleSearch} className="btn btn-primary text-white font-bold">
//           Search
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table w-full">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>User</th>
//               <th>Appointment Date</th>
//               <th>Report</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {isSearchPerformed && filteredData.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No data found
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, index) => (
//                 <tr key={item._id}>
//                   <th>{index + 1}</th>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-12 h-12">
//                           <img src={item.image[0]} alt="Avatar" />
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{item.name[0]}</td>
//                   <td>{item.email}</td>
//                   <td>{item.date}</td>
//                   <td className="flex">
//                     <input className="border-2 border-black rounded-lg" type="text" id="report"/>
//                     <button onClick={()=>handleReport(item._id)} className="font-bold btn-outline btn">Send</button>
                    
                    

//                   </td>
//                   <th>
//                     <button className="btn btn-ghost btn-xl text-red-600">
//                       <FaTrashAlt />
//                     </button>
//                   </th>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Reservation;


import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import useBooked from "../../../hooks/useBooked";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Reservation = () => {
  const [payment, refetch] = useBooked();
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState({});

  useEffect(() => {
    setFilteredData(payment); // Set initial data
  }, [payment]);

  const handleSearch = () => {
    setIsSearchPerformed(true);
    if (searchValue.trim() === "") {
      setFilteredData(payment);
    } else {
      const newData = payment.filter(
        (data) => data.email.toLowerCase() === searchValue.toLowerCase()
      );
      setFilteredData(newData);
    }
  };

  const handleReportChange = (id, value) => {
    setReports({ ...reports, [id]: value });
  };

  const handleReportSubmit = (item) => {
    const report = {
      status: reports[item._id] || "",
    };
    console.log(report.status, item._id);
    axiosSecure
      .patch(`/payment/${item._id}`, report)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          // Refetch to update the UI
          refetch();
          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: `${item.name[0]} result is sending`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch((error) => {
        console.error("Error updating report status:", error);
      });
  };
  const handleDeleteItems = item =>{
    console.log(item._id);
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/payment/${item._id}`)
            .then(res=>{
                if(res.data.deletedCount > 0){
                    // refetch to update the ui
                    
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${payment.name[0]} has been deleted.`,
                        icon: "success"
                      });

                }

            })
            
          
        }
      });
}

  return (
    <div>
      <div className="text-center my-5">
        <input
          className="border-2 border-black py-3 px-5 rounded-lg"
          type="text"
          id="search"
          placeholder="Search by user email"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary text-white font-bold"
        >
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>User</th>
              <th>Appointment Date</th>
              <th>Report</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isSearchPerformed && filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image[0]} alt="Avatar" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item.name[0]}</td>
                  <td>{item.email}</td>
                  <td>{item.date}</td>
                  <td className="flex">
                    <input
                      className="border-2 border-black rounded-lg"
                      type="text"
                      value={reports[item._id] || ""}
                      onChange={(e) =>
                        handleReportChange(item._id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleReportSubmit(item)}
                      className="font-bold btn-outline btn"
                    >
                      Send
                    </button>
                  </td>
                  <th>
                    <button onClick={()=>handleDeleteItems(item)} className="btn btn-ghost btn-xl text-red-600">
                      <FaTrashAlt />
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
