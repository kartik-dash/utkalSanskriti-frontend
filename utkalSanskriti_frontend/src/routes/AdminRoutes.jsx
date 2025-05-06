import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import UserManagement from '../pages/UserManagement';
import Reports from '../pages/Reports';
import profile from '../pages/Profile';
import Regster from '../pages/Registration';
import FromTemplate from '../pages/FromTemplate';
import CustomReport from '../pages/custom-report';
import AllReports from '../pages/AllReports';
import MyReports from '../pages/MyReports';
import SharedWithMe from '../pages/Sharedwithme';
import ArchivedReports from '../pages/ArchivedReports';
import Notification from '../pages/Notification';
import AddCustomer from '../pages/AddCustomer';
import AdminDashboard from '../pages/admin_dashboard';
import adminViewmore from '../pages/adminViewmore';
import adminProfile from '../pages/adminProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import adminchatPage from '../pages/adminchatPage';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import Allbookings from '../pages/Allbookings';
import GetReview from '../pages/GetReview';
import GetFeedback from '../pages/GetFeedback';
import GetTransportHelp from '../pages/GetTransportHelp';
import DestinationListing from '../pages/DestinationListing';



const AdminRoutes = [
  
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/user-management', component: UserManagement },
  { path: '/reports', component: Reports },
  { path: '/profile', component: profile },
  { path: '/registartion', component: Regster },
  { path: "/create-report/usage/template", component: FromTemplate},
  { path: "/create-report/usage/CustomReport", component: CustomReport},
  { path: "/report-library/AllReports", component: AllReports},
  { path: "/report-library/MyReports", component: MyReports},
  { path: "/report-library/SharedWithMe", component: SharedWithMe},
  { path: "/report-library/ArchivedReports", component: ArchivedReports},
  { path: '/Add_visitors', component:AddCustomer},
  { path: '/admindashboard', component:AdminDashboard},
  { path: '/masteradmin-viewmore', component:adminViewmore},
  { path: '/masterprofile', component:adminProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/adminchatpage', component: adminchatPage},
  { path: '/commonemergencysos', component:commonEmergencyservice},
  { path: '/allbookings', component: Allbookings},
  { path: '/review', component:GetReview},
  { path: '/feedback', component:GetFeedback},
  { path: '/transport', component:GetTransportHelp},
  { path: '/destinationlist', component:DestinationListing},

];

export default AdminRoutes;
