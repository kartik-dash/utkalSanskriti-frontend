import UserDashboard from '../pages/UserDashboard';
import Userreport from '../pages/Userreport';
import AllProject from '../pages/AllProject';
import District_Wise_Temple from '../pages/District_Wise_Temple';
import Emergency_Support from '../pages/Emergency_Support';
import Booking_Date from '../pages/Booking_Date';
import UserProfile from '../pages/UserProfile';
import PlaceDetails from '../pages/PlaceDetails';
import MembershipPage from '../pages/Member_ship';
import SettingsPage from '../pages/settingsPage';
import EditProfile from '../pages/editProfile';
import MyProject from '../pages/MyProject';
import Livechart from '../pages/LiveChat';
import EmergencySOS from '../pages/EmergencySOS';
import TransportHelp from '../pages/TransportHelp';
import WeatherAlerts from '../pages/WeatherAlerts';
import RateReview from '../pages/RateReview';
import Feedback from '../pages/Feedback';
import Temple_wise_search from '../pages/TempleSearch';
import PopularDestination from '../pages/PopularDestinations';
import EventNotifications from '../pages/EventNotifications';
import BookingUpdates from '../pages/BookingUpdates';
import EventListingUser from '../pages/EventListingUser';
import ChariKhetraDetails from '../components/Products/ChatiKhetraDetails';
import ShaktiPithaDetails from '../components/Products/ShaktiPithaDetails';
import TempleList from '../components/Products/TempleList';
import AdiShaktiPithaDetails from '../components/Products/AdiShaktiPithaDetails';
import SaivaKhetraDetails from '../components/Products/SaivaKhetraDetails';
import UpcomingEventDetails from '../components/Products/UpcomingEventDetails';
import CuisineDetails from '../components/Products/CuisineDetails';
import FestivalDetails from '../components/Products/FestivalDetails';
import HandicraftsDetails from '../components/Products/HandicraftsDetails';
import DanceDetails from '../components/Products/DanceDetails';
import ProductList from '../components/Products/ProductList'
import ProductDetails from '../components/Products/ProductDetails';
import EastCard from '../components/Card/EastCard';
import WestCard from '../components/Card/WestCard';
import NorthCard from '../components/Card/NorthCard';
import SouthCard from '../components/Card/SouthCard';
import EastDetails from '../components/Products/EastDetails';
import WestDetails from '../components/Products/WestDetails';
import NorthDetails from '../components/Products/NorthDetails';
import SouthDetails from '../components/Products/SouthDetails';
import BlogDetails from '../components/Products/BlogCardDetails';
import BlogCard from '../components/Card/BlogCard';
import HistoryList from "../components/History/HistoryLIst";
import HistoryDetails from "../components/History/HistoryDetails";
import UserHome from '../pages/UserHome';
import About from '../pages/About';
import HeritageCards from '../components/Card/HeritageCards';
import HeritageDetails from '../components/Products/HeritageDetails'
import UtkalSanskriti from '../pages/UtkalSanskriti';
import Culture from '../pages/Culture';
import ReviewForm from '../pages/ReviewForm';
import Gallery from '../pages/Gallery';
import YogaPage from '../pages/Yoga';
import CelebrationAtTemple from '../pages/CelebrationAtTemple';
import ProgramesAtOdishaTemple from '../pages/ProgramesAtOdishaTemple';
import GeetaProgram from '../pages/GeetaProgram';
import Contact from '../pages/Contact';
import RatingGuide from '../pages/RatingGuide';



const ClientRoutes = [
  { path: '/UserDashboard', component: UserDashboard},
  { path: '/userprofile', component: UserProfile },
  { path: '/MyBooking', component: MyProject },
  { path: '/Userreport', component: Userreport },
  { path: '/AllProject', component: AllProject},
  { path: '/SearchTemple', component:District_Wise_Temple},
  { path: '/Booking', component:Booking_Date},
  { path: '/place/:placeName', component:PlaceDetails},
  { path: '/membership', component:MembershipPage},
  { path: '/settings', component:SettingsPage},
  { path: '/editprofile', component: EditProfile},
  { path: '/Livechat', component:Livechart},
  { path: '/Emergency', component:EmergencySOS},
  { path: '/TransportHelp', component:TransportHelp},
  { path: '/WeatherAlerts', component:WeatherAlerts},
  { path: '/RateReview', component:RateReview},
  { path: '/Feedback', component:Feedback},
  { path: '/TempleSearch', component:Temple_wise_search},
  { path: '/PopularDestinations', component:PopularDestination},
  { path: '/EventNotifications', component:EventNotifications},
  { path: '/BookingUpdates', component:BookingUpdates},
  { path: '/EventlistUser', component:EventListingUser},
  { path: '/charikhetra/:productId', component: ChariKhetraDetails },
  { path: '/shaktiPitha/:productId', component: ShaktiPithaDetails },
  { path: '/temples/:categoryId', component: TempleList },
  { path: '/saivakhetra/:productId', component: SaivaKhetraDetails},
  { path: '/adishaktipitha/:productId', component: AdiShaktiPithaDetails},
  { path: '/event/:id', component: UpcomingEventDetails },
  { path: '/cuisinedetails/:cuisineId', component: CuisineDetails },
  { path: '/festivaldetails/:festivalId', component:FestivalDetails},
  { path: '/handicraftsdetails/:handicraftsId', component:HandicraftsDetails},
  { path: '/dancedetails/:danceId', component:DanceDetails},
  { path: '/products/:categoryId', component: ProductList },
  { path: '/products/:categoryId/details/:productId', component: ProductDetails },
  { path: '/east', component:EastCard},
  { path: '/west', component:WestCard},
  { path: '/north', component:NorthCard},
  { path: '/south', component:SouthCard},
  { path: '/south/:productId',component:SouthDetails},
  { path: '/north/:productId', component:NorthDetails},
  { path: '/west/:productId', component:WestDetails},
  { path: '/east/:productId', component:EastDetails},
  { path: '/blogdetails/:blogId', component:BlogDetails},
  { path: '/blog', component:BlogCard},
  { path: '/history', component: HistoryList},
  { path: '/history/:id', component: HistoryDetails},
  { path: '/userhome', component: UserHome},
  { path: '/about', component: About },
  { path: '/heritageSites', component:HeritageCards},
  { path: '/heritageSites/:heritageId', component:HeritageDetails},
  { path: '/aboutUtkalSanskriti',component:UtkalSanskriti},
  { path: '/culture', component:Culture},
  { path: '/reviewForm', component:ReviewForm},
  { path: '/gallery', component:Gallery},
  { path: '/yogo', component: YogaPage},
  { path: '/celebrationattemple', component :CelebrationAtTemple},
  { path: '/programesatodishatemple', component :ProgramesAtOdishaTemple},
  { path: '/geetaprogram', component :GeetaProgram},
  { path: '/contact', component: Contact },
  { path: '/guiderating', component: RatingGuide},
      
];

export default ClientRoutes;
