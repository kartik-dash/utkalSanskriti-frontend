import React from "react";

const Empanel = () => {
  // Dummy data for empanelled temples
  const empanelData = [
    { templeName: "Jagannath Temple", district: "Puri", empanelDate: "2024-01-10" },
    { templeName: "Lingaraj Temple", district: "Bhubaneswar", empanelDate: "2023-12-15" },
    { templeName: "Sun Temple", district: "Konark", empanelDate: "2024-02-05" },
    { templeName: "Chandi Temple", district: "Cuttack", empanelDate: "2024-03-12" },
    { templeName: "Samaleswari Temple", district: "Sambalpur", empanelDate: "2023-11-20" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Empanelled Temples</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Temple Name</th>
            <th className="py-2 px-4 border-b">District</th>
            <th className="py-2 px-4 border-b">Empanel Date</th>
          </tr>
        </thead>
        <tbody>
          {empanelData.map((data, index) => (
            <tr key={index} className="border-b text-center">
              <td className="py-2 px-4">{data.templeName}</td>
              <td className="py-2 px-4">{data.district}</td>
              <td className="py-2 px-4">{data.empanelDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empanel;
