import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings, MdOutlinePermIdentity } from 'react-icons/md';
import { TbHexagonalPyramidPlus } from 'react-icons/tb';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
// import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
import { fetchOverallCounts } from '../redux/thunks/masteradmindetailsThunks';
import { Link } from "react-router-dom";
// Register Chart.js components
ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

// const dataPie = {
//   labels: ["Student Strength", "Today's Collection", "New Admissions", "Faculty Strength"],
//   datasets: [
//     {
//       data: [13436, 185358, 5464, 723],
//       backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
//       hoverBackgroundColor: ["#6495ED", "#9B59B6", "#48C9B0", "#F5B7B1"],
//     },
//   ],
// };

// const dataBar = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Temple",
//       data: [65, 59, 80, 81, 56, 55, 40],
//       backgroundColor: [
//         "rgba(75,192,192,0.2)",
//         "rgba(153,102,255,0.2)",
//         "rgba(255,159,64,0.2)",
//         "rgba(255,99,132,0.2)",
//         "rgba(54,162,235,0.2)",
//         "rgba(255,206,86,0.2)",
//         "rgba(231,233,237,0.2)",
//       ],
//       borderColor: [
//         "rgba(75,192,192,1)",
//         "rgba(153,102,255,1)",
//         "rgba(255,159,64,1)",
//         "rgba(255,99,132,1)",
//         "rgba(54,162,235,1)",
//         "rgba(255,206,86,1)",
//         "rgba(231,233,237,1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const optionsPie = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     tooltip: {
//       callbacks: {
//         label: (tooltipItem) => {
//           return `${tooltipItem.label}: ₹${tooltipItem.raw.toLocaleString()}`;
//         },
//       },
//     },
//   },
// };

// const optionsBar = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     tooltip: {
//       callbacks: {
//         label: (tooltipItem) => {
//           return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
//         },
//       },
//     },
//   },
//   scales: {
//     x: {
//       ticks: {
//         autoSkip: false,
//       },
//       grid: {
//         display: false,
//       },
//     },
//     y: {
//       beginAtZero: true,
//     },
//   },
//   elements: {
//     bar: {
//       barThickness: 20,
//     },
//   },
// };

const teamleader_dashboard = () => {
  const dispatch = useDispatch();

  // Replace with actual userId (from props, context, etc.)
  const userId = useSelector((state) => state.auth?.userId);
  // Adjust based on your auth structure
  // Select the overallCounts state from Redux and handle undefined
  const { overallCounts = {}, fetchStatus, error } = useSelector((state) => state.overallCounts || {});
  console.log('overallCounts:', overallCounts);


  useEffect(() => {
    if (userId) {
      dispatch(fetchOverallCounts(userId));
    }
  }, [dispatch, userId]);

  if (fetchStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (fetchStatus === 'failed') {
    return <div>Error: {error}</div>;
  }
  console.log('sssss:', userId);

  return (
    <div className="master-body">
      <div className="mster_view_body">
        {/* Admin Card */}

        <div className="mster_view_card">
          <div className="card-box bg-purple">
            <div className="inner">
              <h3>Support Service</h3>
              <p>{overallCounts?.SUPPORT_SERVICE ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=SUPPORT_SERVICE" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>

        {[
        ].map((item, index) => (
          <div key={index} className="mster_view_card">
            <div className={`card-box ${item.bg}`}>
              <div className="inner">
                <h3>{item.title}</h3>
                <p>{overallCounts?.[item.key] ?? 0}</p>
              </div>

              <div className="icon">
                {item.icon}
              </div>
              <a href="#" className="card-box-footer">
                View More <FaArrowCircleRight />
              </a>
            </div>
          </div>
        ))}

      </div>

      {/* <div className="dashboard_chart_detail">
        <div className="dashboard_chart_body">
          <div className="chart-container w-[65%] p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-center mb-5">Full Overview</h2>
            <Bar data={dataBar} options={optionsBar} />
          </div>
          <div className="card-box_chart">
            <div className="inner">
              <h3>Dashboard Overview</h3>
            </div>
            <div className="pie-chart-container">
              <Pie data={dataPie} options={optionsPie} />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default teamleader_dashboard;



