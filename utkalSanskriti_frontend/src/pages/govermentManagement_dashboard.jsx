
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowCircleRight } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings, MdOutlinePermIdentity } from 'react-icons/md';
import { TbHexagonalPyramidPlus } from 'react-icons/tb';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchOverallCounts } from '../redux/thunks/masteradmindetailsThunks';
import { Link } from "react-router-dom";
import { fetchDomesticCount, fetchAllVisitorsManagementCount } from '../redux/thunks/domesticThunks';
import { fetchInternationalcount } from '../redux/thunks/internationalThunks';
// Register Chart.js components
ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);


const GovermentManagementDashboard = () => {
  const dispatch = useDispatch();

  // Replace with actual userId (from props, context, etc.)
  const userId = useSelector((state) => state.auth?.userId);
  // Adjust based on your auth structure
  // Select the overallCounts state from Redux and handle undefined
  const { overallCounts = {}, fetchStatus, error } = useSelector((state) => state.overallCounts || {});
  console.log('overallCounts:', overallCounts);
  const domesticCount = useSelector((state) => state.domestic?.domesticCount ?? 0);
  const internationalCount = useSelector((state) => state.international?.internationalCount ?? 0);
  const AllmanagementCount = useSelector((state) => state.domestic?.Allmanagement ?? 0);


 useEffect(() => {
    dispatch(fetchDomesticCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllVisitorsManagementCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchInternationalcount());
  }, [dispatch]);


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
        <div className="mster_view_card">
          <div className="card-box bg-yellow">
            <div className="inner">
              <h3>GOVERMENT</h3>
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
        <div className="mster_view_card">
          <div className="card-box bg-red">
            <div className="inner">
              <h3>All Visitors</h3>
              <p>{AllmanagementCount}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/AllvisitorsManagement" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-blue">
            <div className="inner">
              <h3>District Wise Visitors</h3>
              <p className='invisible'>95</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/DistrictWiseVisitors" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
           <div className="card-box bg-orange">
              <div className="inner">
                <h3>Domestic</h3>
                <p>{domesticCount}</p> {/* ✅ Correct count here */}
              </div>
              <div className="icon">
                <AiOutlineUsergroupAdd size={72} />
              </div>
              <Link to="/domestic" className="card-box-footer">
                View More <FaArrowCircleRight />
              </Link>
            </div>
          </div>
        <div className="mster_view_card">
          <div className="card-box bg-green">
            <div className="inner">
              <h3>International</h3>
              <p>{internationalCount}</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/international" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-blue">
            <div className="inner">
              <h3>Empanel</h3>
              <p>148</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="/empanel" className="card-box-footer">
              View More <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="mster_view_card">
          <div className="card-box bg-yellow">
            <div className="inner">
              <h3>Not Empanel</h3>
              <p className='invisible'>0</p>
            </div>
            <div className="icon">
              <AiOutlineUsergroupAdd size={72} />
            </div>
            <Link to="" className="card-box-footer">
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

export default GovermentManagementDashboard;