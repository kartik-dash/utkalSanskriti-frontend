import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHistory, setSelectedHistory } from "../../redux/slices/historySlice"; 
import { useNavigate } from "react-router-dom";

const HistoryList = () => {
    const historyList = useSelector(selectHistory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-800 border-b pb-3 mt-20 mb-4">Ancient History</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {historyList.map((item, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-4 border rounded-lg shadow hover:shadow-md transition duration-300"
                        >
                            {/* Title */}
                            <h2 className="text-xl font-semibold text-gray-700">{item.title}</h2>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mt-2">
                                {item.description.length > 100 
                                    ? `${item.description.substring(0, 100)}...` 
                                    : item.description}
                            </p>

                            {/* Image */}
                            {item.image && (
                                <div className="mt-3">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                       className="w-full h-[22rem] object-cover rounded-md"
                                    />
                                </div>
                            )}

                            {/* Read More Button */}
                            <button 
                                onClick={() => {
                                    dispatch(setSelectedHistory(item)); // Store selected history in Redux
                                    navigate(`/history/${index}`);
                                }}
                                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                            >
                                Read More
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryList;
