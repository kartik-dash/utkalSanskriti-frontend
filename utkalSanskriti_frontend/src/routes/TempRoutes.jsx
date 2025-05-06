import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import UserManagement from '../pages/UserManagement';
import MyProject from '../pages/MyProject';
import AllProject from '../pages/AllProject';
import ProjectStatus from '../pages/ProjectStatus';
import AssignGuide from '../pages/AssignGuide';
import TemplaAdminDashboard from '../pages/templeadmin_dashboard';
import templeadminProfile from '../pages/templeadminProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import templeAdminViewmore from '../pages/templeAdminViewmore';
import commonEmergencyservice from '../pages/commonEmergencyservice';
import AllvisitorsTempleadmin from '../pages/AllvisitorsTempleadmin';
import RateReviewTempleAdmin from '../pages/RateReviewTempleAdmin';
import BlockedGuidelist from '../pages/BlockedGuidelist';
import EmergencyForMidlevel from '../pages/EmergencyForMidlevel';


const TempRoutes = [
  { path: '/UserDashboard', component: UserDashboard},
  { path: '/profile', component: Profile },
  { path: '/user-management', component: UserManagement},
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/assignguide', component: AssignGuide},
  { path: '/templeadmindashboard', component: TemplaAdminDashboard},
  { path: '/masterprofile', component: templeadminProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/masteradmin-viewmore', component:templeAdminViewmore},
  { path: '/emergencysos', component:commonEmergencyservice},
  { path: '/allvisitorstempleadmin', component:AllvisitorsTempleadmin},
  { path: '/ratereviewtempleadmin', component:RateReviewTempleAdmin},
  { path: '/blockedguide', component:BlockedGuidelist},
  { path: '/getemergencysos', component:EmergencyForMidlevel},


];

export default TempRoutes;
