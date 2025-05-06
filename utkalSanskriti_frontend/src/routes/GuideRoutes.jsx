import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import UserManagement from '../pages/UserManagement';
import MyProject from '../pages/MyProject';
import AllProject from '../pages/AllProject';
import ProjectStatus from '../pages/ProjectStatus';
import AllassignGuide from '../pages/AllassignGuide';
import guideProfile from '../pages/guideProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import guide_dashboard from '../pages/guide_dashboard';
import EmergencyService from '../pages/EmergencyService';
import RateReviewGuide from '../pages/RateReviewGuide';
import EmergencyForMidlevel from '../pages/EmergencyForMidlevel';



const GuideRoutes = [
  { path: '/guide_dashboard', component: guide_dashboard},
  { path: '/profile', component: Profile },
  { path: '/user-management', component: UserManagement},
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/mycustomers', component: AllassignGuide},
  { path: '/masterprofile', component: guideProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/emergencysos', component:EmergencyService},
  { path: '/ratereviewguide', component:RateReviewGuide},
  { path: '/getemergencysos', component:EmergencyForMidlevel},
  
];

export default GuideRoutes;
