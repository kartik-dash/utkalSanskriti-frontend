import Dashboard from '../pages/Dashboard';
import Reports from '../pages/Reports';
import UserManagement from '../pages/UserManagement';
import UserReport from '../pages/Userreport';
import MyProject from '../pages/MyProject';
import ProjectStatus from '../pages/ProjectStatus';
import AllProject from '../pages/AllProject';
// import AllVisitors from '../pages/AllVisitors';
import AddCustomer from '../pages/AddCustomer';
import AddTemple from '../pages/AddTemple';
import AssignMIdlevel from '../pages/AssignMIdlevel';
import ToplevelDashboard from '../pages/Top-Level-Dashboard';
import toplevelViewmore from '../pages/toplevelViewmore';
import toplevelProfile from '../pages/toplevelProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import AddEvent from '../pages/AddEvent';
import EventList from '../pages/EventListing';
import toplevelchatPage from '../pages/toplevelchatPage';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import AddDestinations from '../pages/AddDestinations';
import GovContact from '../pages/GovContact';
import DestinationListing from '../pages/DestinationListing';




const TopRoutes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/reports', component: Reports },
  { path: '/user-management', component: UserManagement },
  { path: '/Userreport', component: UserReport },
  { path: '/MyProject', component: MyProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: 'AllProject', component: AllProject},
  { path: '/Add_visitors', component:AddCustomer},
  { path: '/AddTemple', component:AddTemple},
  { path: '/assignmid', component:AssignMIdlevel},
  { path: '/topleveldashboard', component:ToplevelDashboard},
  { path: '/masteradmin-viewmore', component:toplevelViewmore},
  { path: '/masterprofile', component:toplevelProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/AddEvent', component:AddEvent},
  { path: '/EventList', component:EventList},
  { path: '/topchatpage', component:toplevelchatPage},
  { path: '/commonemergencysos', component:commonEmergencyservice},
  { path: '/destinations', component:AddDestinations},
  { path: '/govcontact', component:GovContact},
  { path: '/destinationlist', component:DestinationListing},


];

export default TopRoutes;
