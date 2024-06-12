import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useBooked from "../../../hooks/useBooked";
import { jsPDF } from "jspdf";

const UserDetails = () => {
    const user = useLoaderData();
    const { email } = user;
    const [payment] = useBooked();
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        setFilteredData(payment); // Set initial data
    }, [payment]);

    const specificData = filteredData.filter(data => data.email === email);
    
    const downloadPDF = (data) => {
        const doc = new jsPDF();
        doc.text("User Details", 10, 10);
        doc.text(`Test Name: ${data.name}`, 10, 20);
        doc.text(`Email: ${data.email}`, 10, 30);
        doc.text(`Appointments Date: ${data.date}`, 10, 40);
        doc.save("user-details.pdf");
    };

    return (
        <div className="text-center my-10">
            <div className="stats shadow">
                {specificData.map(data => (
                    <div key={data._id} className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src={data.image} alt="User Avatar" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">{data.email}</div>
                        
                        <div className="stat-desc text-secondary">{specificData.length} Appointments</div>
                    </div>
                ))}
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Test Name</th>
                            <th>Email</th>
                            <th>Appointments Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specificData.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.date}</td>
                                <td>
                                    <button className="btn btn-outline" onClick={() => downloadPDF(data)}>
                                        Download User Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;
