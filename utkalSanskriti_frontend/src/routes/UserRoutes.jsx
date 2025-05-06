import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import ProductList from '../components/Products/ProductList'
import ProductDetails from '../components/Products/ProductDetails';
import Registration from '../pages/Registration';
import ChariKhetraDetails from '../components/Products/ChatiKhetraDetails';
import ShaktiPithaDetails from '../components/Products/ShaktiPithaDetails';
import Contact from '../pages/Contact';
import YogaPage from '../pages/Yoga';
import CelebrationAtTemple from '../pages/CelebrationAtTemple';
import ProgramesAtOdishaTemple from '../pages/ProgramesAtOdishaTemple';
import GeetaProgram from '../pages/GeetaProgram';
import UpcomingEventDetails from '../components/Products/UpcomingEventDetails';
import TempleList from '../components/Products/TempleList';
import HeritageCards from '../components/Card/HeritageCards';
import HeritageDetails from '../components/Products/HeritageDetails'
import UtkalSanskriti from '../pages/UtkalSanskriti';
import CuisineDetails from '../components/Products/CuisineDetails';
import FestivalDetails from '../components/Products/FestivalDetails';
import HandicraftsDetails from '../components/Products/HandicraftsDetails';
import DanceDetails from '../components/Products/DanceDetails';
import BlogDetails from '../components/Products/BlogCardDetails';
import BlogCard from '../components/Card/BlogCard';
import Culture from '../pages/Culture';
import ReviewForm from '../pages/ReviewForm';
import Gallery from '../pages/Gallery';
import UploadForm from '../pages/Uploadform';
import EastCard from '../components/Card/EastCard';
import WestCard from '../components/Card/WestCard';
import EastDetails from '../components/Products/EastDetails';
import WestDetails from '../components/Products/WestDetails';
import NorthCard from '../components/Card/NorthCard';
import NorthDetails from '../components/Products/NorthDetails';
import SouthCard from '../components/Card/SouthCard';
import SouthDetails from '../components/Products/SouthDetails';
import MasterAdminRegistration from '../pages/MasterAdminRegistration';
import AdiShaktiPithaDetails from '../components/Products/AdiShaktiPithaDetails';
import SaivaKhetraDetails from '../components/Products/SaivaKhetraDetails';
import ForgotPassword from '../pages/forgotPassword';
import HistoryList from "../components/History/HistoryLIst";
import HistoryDetails from "../components/History/HistoryDetails";
import UpcomingEventCard from '../components/Card/UpcomingEventCard';
import Services from '../pages/Services';
import Dislcaimer from '../pages/Dislcaimer';
import Faq from '../pages/Faq';



const UserRoutes = [

  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/heritageSites', component:HeritageCards},
  { path: '/heritageSites/:heritageId', component:HeritageDetails},
  { path: '/products/:categoryId', component: ProductList },
  { path: '/temples/:categoryId', component: TempleList },
  { path: '/products/:categoryId/details/:productId', component: ProductDetails },
  { path: '/charikhetra/:productId', component: ChariKhetraDetails },
  { path: '/shaktiPitha/:productId', component: ShaktiPithaDetails },
  { path: '/event/:id', component: UpcomingEventDetails },
  { path: '/yogo', component: YogaPage},
  { path: '/celebrationattemple', component :CelebrationAtTemple},
  { path: '/programesatodishatemple', component :ProgramesAtOdishaTemple},
  { path: '/geetaprogram', component :GeetaProgram},
  { path: '/aboutUtkalSanskriti',component:UtkalSanskriti},
  { path: '/cuisinedetails/:cuisineId', component: CuisineDetails },
  { path: '/festivaldetails/:festivalId', component:FestivalDetails},
  { path: '/handicraftsdetails/:handicraftsId', component:HandicraftsDetails},
  { path: '/dancedetails/:danceId', component:DanceDetails},
  { path: '/blogdetails/:blogId', component:BlogDetails},
  { path: '/blog', component:BlogCard},
  { path: '/culture', component:Culture},
  { path: '/reviewForm', component:ReviewForm},
  { path: '/gallery', component:Gallery},
  { path: '/Uploadform', component:UploadForm},
  { path: '/east', component:EastCard},
  { path: '/west', component:WestCard},
  { path: '/east/:productId', component:EastDetails},
  { path: '/west/:productId', component:WestDetails},
  { path: '/north', component:NorthCard},
  { path: '/north/:productId', component:NorthDetails},
  { path: '/south', component:SouthCard},
  { path: '/south/:productId',component:SouthDetails},
  { path: '/masteradmin', component:MasterAdminRegistration},
  { path: '/adishaktipitha/:productId', component: AdiShaktiPithaDetails},
  { path: '/saivakhetra/:productId', component: SaivaKhetraDetails},
  { path: '/forgot-password', component: ForgotPassword},
  { path: '/history', component: HistoryList},
  { path: '/history/:id', component: HistoryDetails},
  { path: '/event', component: UpcomingEventCard},
  { path: '/services', component: Services},
  { path: '/disclaimer', component: Dislcaimer},
  { path: '/faq', component:Faq}

];

export default UserRoutes;
