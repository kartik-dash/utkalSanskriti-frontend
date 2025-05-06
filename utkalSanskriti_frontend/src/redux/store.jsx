import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import templeDistrictReducer from './slices/templeSlice';
import authReducer from './slices/authSlice'; // Add authReducer here
import categoryReducer from './slices/categorySlice';
// import authReducer from './slices/authSlice';
import cuisineReducer from './slices/cuisineSlice';
import danceReducer from './slices/danceSlice';
import festivalReducer from './slices/festivalSlice';
import handicraftsReducer from './slices/handicraftsSlice';
import blogReducer from './slices/blogSlice';
import reviewsReducer from './slices/reviewSlice';
import clientReducer from './slices/clientSlice';
import chatReducer from './slices/chatSlice';
import customerReducer from './slices/customerSlice';
import membershipReducer from './slices/membershipSlice';
import bookingReducer from './slices/bookingSlice';
import midLevelReducer from './slices/midLevelSlice';
import assignmidReducer from './slices/assignmidSlice';
import teamLeadReducer from './slices/teamLeadSlice';
import supportReducer from './slices/supportSlice';
import supportServiceReducer from './slices/supportserviceSlice';
import templeadminReducer from './slices/templeadminSlice';
import assignGuideReducer from './slices/allassignguideSlice';
import guideReducer from './slices/guideSlice';
import supportchatReducer from './slices/chatsupportSlice';
import alladminReducer from './slices/masteradminSlice';
import overallCountsReducer from './slices/masteradmindetailsSlice';
import viewAdminReducer from './slices/masteradminviewmoreSlice';
import masterProfileReducer from './slices/masteradminProfileSlice';
import editprofileReducer from './slices/editprofileSlice';
import forgotReducer from './slices/forgotPasswordSlice';
import changeReducer from './slices/settingsPageSlice';
import eventReducer from './slices/eventSlice';
import transportHelpReducer from './slices/tansportSlice';
// import destinationReducer from './slices/destinationSlice';
import historyReducer from './slices/historySlice';     
import videoReducer from './slices/videoSlice';
import verifyReducer from './slices/verifyotpSlice';
import chatmessageReducer from './slices/chatPageSlice';
import emergenysosReducer from './slices/emergencysosSlice';
import domesticReducer from './slices/domesticSlice';
import internationalReducer from './slices/internationalSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // User-related slice
    temple: templeDistrictReducer, // User-related slice
    auth: authReducer, 
    category: categoryReducer,
    cuisine: cuisineReducer,
    dance: danceReducer,
    festival: festivalReducer,
    handicrafts:handicraftsReducer,
    blog:blogReducer,
    reviews: reviewsReducer, // Auth-related slice
    client: clientReducer,
    chat:chatReducer,
    customer: customerReducer,
    membership: membershipReducer,
    booking: bookingReducer,
    midLevel: midLevelReducer,
    assignmid:assignmidReducer,
    teamLead:teamLeadReducer,
    support:supportReducer,
    supportService:supportServiceReducer,
    templeadmin:templeadminReducer,
    assignGuide:assignGuideReducer,
    guide:guideReducer,
    supportchat:supportchatReducer,
    alladmin:alladminReducer,
    overallCounts:overallCountsReducer,
    viewAdmin:viewAdminReducer,
    masterProfile:masterProfileReducer,
    editprofile:editprofileReducer,
    forgot:forgotReducer,
    change:changeReducer,
    event: eventReducer,
    transportHelp: transportHelpReducer,
    // destinations: destinationReducer,
    history: historyReducer,
    video: videoReducer,
    verify: verifyReducer,
    chatmessage: chatmessageReducer,
    emergenysos: emergenysosReducer,
    domestic: domesticReducer,
    international:internationalReducer,
  },
});

export default store;
