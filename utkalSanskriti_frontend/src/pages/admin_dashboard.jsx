
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



const AdminDashboard = () => {
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
          <div className="card-box bg-green">
            <div className="inner">
              <h3>Top Level</h3>
              <p>{overallCounts?.TOP_LEVEL ?? 0}</p>
            </div>
            <div className="icon">
              <MdOutlinePermIdentity size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=TOP_LEVEL" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-orange">
            <div className="inner">
              <h3>Mid Level</h3>
              <p>{overallCounts?.MID_LEVEL ?? 0}</p>
            </div>
            <div className="icon">
              <TbHexagonalPyramidPlus size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=MID_LEVEL" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-blue">
            <div className="inner">
              <h3>Team Leader</h3>
              <p>{overallCounts?.TEAM_LEADER ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=TEAM_LEADER" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
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
        <div className="mster_view_card">
          <div className="card-box bg-yellow">
            <div className="inner">
              <h3>Goverment Management</h3>
              <p>{overallCounts?.GOVERMENT_MANAGEMENT ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=GOVERMENT_MANAGEMENT" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-purple">
            <div className="inner">
              <h3>Goverment</h3>
              <p>{overallCounts?.GOVERMENT ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=GOVERMENT" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-red">
            <div className="inner">
              <h3>Temple Admin</h3>
              <p>{overallCounts?.TEMPLE_ADMIN ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=TEMPLE_ADMIN" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-green">
            <div className="inner">
              <h3>Guide</h3>
              <p>{overallCounts?.GUIDE ?? 0}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/masteradmin-viewmore?role=GUIDE" className="card-box-footer">
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

export default AdminDashboard;