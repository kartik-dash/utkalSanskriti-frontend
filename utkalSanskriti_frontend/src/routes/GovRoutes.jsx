import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import Userreport from '../pages/Userreport';
import MyProject from '../pages/MyProject';
import AllProject from '../pages/AllProject';
import ProjectStatus from '../pages/ProjectStatus';
import UserManagementGovt from '../pages/UserManagementGovt';
import GovermentDashboard from '../pages/goverment_dashboard';
import govtProfile from '../pages/govtProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import govtViewmore from '../pages/govtViewmore';
import ContactusGoverment from '../pages/ContactusGoverment';
import AllVisitorsGoverment from '../pages/AllVisitorsGoverment';


const GovRoutes = [
  { path: '/UserDashboard', component: UserDashboard},
  { path: '/profile', component: Profile },
  { path: '/Userreport', component: Userreport },
  { path: '/MyProject', component: MyProject },
  { path: '/AllProject', component: AllProject },
  { path: '/ProjectStatus', component: ProjectStatus },
  { path: '/user-management-govt', component: UserManagementGovt},
  { path: '/govermentdashboard', component: GovermentDashboard},
  { path: '/masterprofile', component:govtProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/masteradmin-viewmore', component:govtViewmore},
  { path: '/contactussupport', component:ContactusGoverment},
  { path: '/alldetails', component:AllVisitorsGoverment},

];

export default GovRoutes;
