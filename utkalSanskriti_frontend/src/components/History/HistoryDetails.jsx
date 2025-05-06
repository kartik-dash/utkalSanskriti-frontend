import React from "react";
import { useSelector } from "react-redux";
import { selectHistory } from "../../redux/slices/historySlice"; 
import { useParams, useNavigate } from "react-router-dom";

const HistoryDetails = () => {
    const { id } = useParams();
    const historyList = useSelector(selectHistory);
    const navigate = useNavigate();
    const selectedHistory = historyList[id];

    if (!selectedHistory) {
        return <p className="p-4">No history found. <button onClick={() => navigate("/history")} className="text-blue-500">Go back</button></p>;
    }

    return (
        <div className="container history-sec">
        <div className="p-4 border my-[180px] rounded-lg border-orange shadow-lg">
            <h2 className="text-xl font-bold mb-2">{selectedHistory.title}</h2>
            <p>{selectedHistory.description}</p>
            <button onClick={() => navigate("/history")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Back to History List
            </button>
        </div>
        </div>
    );
};

export default HistoryDetails;
