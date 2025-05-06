import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import UserManagement from '../pages/UserManagement';
import MyProject from '../pages/MyProject';
import AllProject from '../pages/AllProject';
import ProjectStatus from '../pages/ProjectStatus';
import Notification from '../pages/Notification';
import AssignSupport from '../pages/AssignSupport';
import TeamleaderDashboard from '../pages/teamleader_dashboard';
import teamleaderProfile from '../pages/teamleaderProfile';
import teamleaderViewmore from '../pages/teamleaderViewmore';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import teamleadchatPage from '../pages/teamleadchatPage';
import EmergencyForMidlevel from '../pages/EmergencyForMidlevel';
import PoojaListing from '../pages/PoojaListingTeamlead';
import GetTransportHelpTeamLeader from '../pages/GetTransportHelpTeamLeader';



const LowRoutes = [
  { path: '/UserDashboard', component: UserDashboard },
  { path: '/profile', component: Profile },
  { path: '/user-management', component: UserManagement },
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/assignsupport', component: AssignSupport},
  { path: '/teamleaderDashboard', component:TeamleaderDashboard},
  { path: '/masterprofile', component:teamleaderProfile},
  { path: '/masteradmin-viewmore', component:teamleaderViewmore},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/emergencysos', component:commonEmergencyservice},
  { path: '/teamleadchat', component:teamleadchatPage},
  { path: '/getemergencysos', component:EmergencyForMidlevel},
  { path: '/poojalistingteam', component:PoojaListing},
  { path: '/transportTeam', component:GetTransportHelpTeamLeader},
];

export default LowRoutes;
