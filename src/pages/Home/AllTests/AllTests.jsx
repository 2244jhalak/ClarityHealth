import { useState } from "react";
import { Link } from "react-router-dom";
import useTest from "../../../hooks/useTest";

const AllTests = () => {
    const [test] = useTest();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDate, setSelectedDate] = useState("");
    const itemsPerPage = 6;

    // Filter data based on selected date
    const filteredData = test.filter(testItem => {
        return !selectedDate || new Date(testItem.date) >= new Date(selectedDate);
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Get current page data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Handle date change
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setCurrentPage(1); // Reset to first page when date changes
    };

    return (
        <div>
            <h2 className="text-center font-semibold text-3xl mb-5">All Available Tests (starting from date of today)</h2>
            <div className="flex justify-center mb-5">
                <input
                    type="date"
                    className="input input-bordered"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
                {currentPageData.map(testItem => (
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
                ))}
            </div>

            <div className="flex justify-center mt-5">
                <button
                    className="btn btn-outline mr-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn btn-outline ${currentPage === index + 1 ? 'btn-active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="btn btn-outline ml-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllTests;
