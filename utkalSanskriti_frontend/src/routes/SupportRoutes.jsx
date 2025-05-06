// import UserDashboard from '../pages/UserDashboard';
import Profile from '../pages/Profile';
import AssignSupportusers from '../pages/AssignSupportusers';
import SupportDashboard from '../pages/SupportDashboard';
import supportProfile from '../pages/supportProfile';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import Livechart from '../pages/LiveChatSupport';
import ChatPage from '../pages/ChatPage';
import EmergencyService from '../pages/EmergencyService';
import supportchatPage from '../pages/supportchatPage';
import AllvisitorsSupportService from '../pages/AllvisitorsSupportService';
import RateReviewSupport from '../pages/RateReviewSupport';
import PoojaListing from '../pages/PoojaListing';
import EmergencyForMidlevel from '../pages/EmergencyForMidlevel';
import GetTransportHelpSupport from '../pages/GetTransportHelpSupport';
import EmergencyForSupportlevel from '../pages/EmergencyForSupportlevel';



const SupportRoutes = [
  // { path: '/UserDashboard', component: UserDashboard},
  { path: '/profile', component: Profile },
  { path: '/myusers', component:AssignSupportusers},
  { path: '/support', component:SupportDashboard},
  { path: '/masterprofile', component:supportProfile},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/livechat/:recipientId', component:Livechart},
  { path: '/chat', component: ChatPage},
  { path: '/emergencysos', component:EmergencyService},
  { path: '/supportchat', component:supportchatPage},
  { path: '/allvisitorssupport', component:AllvisitorsSupportService},
  { path: '/ratereviewsupport', component:RateReviewSupport},
  { path: '/poojalisting', component:PoojaListing},
  { path: '/getemergencysos', component:EmergencyForMidlevel},
  { path: '/trasnportSupport', component:GetTransportHelpSupport},
  { path: '/getemergencysup', component:EmergencyForSupportlevel}


];

export default SupportRoutes;
