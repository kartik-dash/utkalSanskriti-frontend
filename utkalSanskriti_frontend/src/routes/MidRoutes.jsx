
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import UserManagement from '../pages/UserManagement';
import MyProject from '../pages/MyProject';
import ProjectStatus from '../pages/ProjectStatus';
import AllProject from '../pages/AllProject';
import CardDashboard from '../pages/masteradmin_dashboard';
import AssignMIdlevel from '../pages/AssignMIdlevel';
import AssignTeamLead from '../pages/AssignTeamlead';
import MidlevelDashboard from '../pages/midlevel_dashboard';
import midlevelViewmore from '../pages/midlevelViewmore';
import midlevelProfile from '../pages/midlevelProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import midchatPage from '../pages/midchatPage';
import AllVisitorsMid from '../pages/AllVisitorsMid';
import EmergencyForMidlevel from '../pages/EmergencyForMidlevel';
import GetTansportHelpMidLevel from '../pages/GetTansportHelpMidLevel';
import AddTemple from '../pages/AddTemple';
import AddEvent from '../pages/AddEvent';



const MidRoutes = [
  { path: '/profile', component: Profile },
  { path: '/user-management', component: UserManagement},
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/CardDashboard', component: CardDashboard },
  { path: '/assignmid', component:AssignMIdlevel},
  { path: '/assignteam', component:AssignTeamLead},
  { path: '/midlevelDashboard', component:MidlevelDashboard},
  { path: '/masteradmin-viewmore', component:midlevelViewmore},
  { path: '/masterprofile', component:midlevelProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/emergencysos', component:commonEmergencyservice},
  { path: '/midchatpage', component:midchatPage},
  { path: '/allvisitorsmid', component:AllVisitorsMid},
  { path: '/getemergencysos', component:EmergencyForMidlevel},
  { path: '/transportMid', component:GetTansportHelpMidLevel},
  { path: "/AddTemple", component:AddTemple},
  { path: '/AddEvent', component:AddEvent},

];

export default MidRoutes;
