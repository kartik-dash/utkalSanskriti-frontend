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
import Masteradmindashboard from '../pages/masteradmin_dashboard';
import masteradminViewmore from '../pages/masteradminViewmore';
import masteradminProfile from '../pages/masteradminProfile';
import EditProfile from '../pages/editProfile';
import SettingsPage from '../pages/settingsPage';
import ChatPage from '../pages/ChatPage';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import GetReview from '../pages/GetReview';
import GetFeedback from '../pages/GetFeedback';
import GetTransportHelp from '../pages/GetTransportHelp';
import Allbookings from '../pages/Allbookings';
import DestinationListing from '../pages/DestinationListing';





const MasterAdminRoutes = [
  { path: '/login', component: Login },
  { path: '/user-management', component: UserManagement },
  { path: '/reports', component: Reports },
  { path: '/master', component: profile },
  { path: '/registartion', component: Regster },
  { path: "/create-report/usage/template", component: FromTemplate},
  { path: "/create-report/usage/CustomReport", component: CustomReport},
  { path: "/report-library/AllReports", component: AllReports},
  { path: "/report-library/MyReports", component: MyReports},
  { path: "/report-library/SharedWithMe", component: SharedWithMe},
  { path: "/report-library/ArchivedReports", component: ArchivedReports},
  { path: '/Add_visitors', component:AddCustomer},
  { path: '/masteradmin_dashboard', component:Masteradmindashboard},
  { path: '/masteradmin-viewmore', component:masteradminViewmore},
  { path: '/masterprofile', component:masteradminProfile},
  { path: '/editprofile', component: EditProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/chat', component: ChatPage},
  { path: '/commonemergencysos', component:commonEmergencyservice},
  { path: '/review', component:GetReview},
  { path: '/feedback', component:GetFeedback},
  { path: '/transport', component:GetTransportHelp},
  { path: '/allbookings', component:Allbookings},
  { path: '/destinationlist', component:DestinationListing},

];

export default MasterAdminRoutes;
