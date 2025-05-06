import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import UserManagement from '../pages/UserManagement';
import MyProject from '../pages/MyProject';
import AllProject from '../pages/AllProject';
import ProjectStatus from '../pages/ProjectStatus';
import GovermentManagementDashboard from '../pages/govermentManagement_dashboard.jsx';
import managementGovtProfile from '../pages/managementGovtProfile.jsx';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import govermentmanagementViewmore from '../pages/govermentmanagementViewmore.jsx';
import AllVisitorsManagement from '../pages/AllVisitorsManagement.jsx';
import District_wise_Visitors from '../pages/District_wise_Visitors.jsx';
import Empanel from '../pages/Empanel.jsx';
import Domestic from '../pages/Domestic.jsx';
import International from '../pages/International.jsx';

const ManagementRoutes = [
  { path: '/UserDashboard', component: UserDashboard},
  { path: '/profile', component: Profile },
  { path: '/user-management', component: UserManagement},
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/govmanagementdashboard', component: GovermentManagementDashboard},
  { path: '/masterprofile', component:managementGovtProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/masteradmin-viewmore', component:govermentmanagementViewmore},
  { path: '/AllvisitorsManagement', component: AllVisitorsManagement},
  { path: '/DistrictWiseVisitors', component: District_wise_Visitors},
  { path: '/empanel', component: Empanel},
  { path: '/domestic', component: Domestic},
  { path: '/international', component: International},
];

export default ManagementRoutes;
