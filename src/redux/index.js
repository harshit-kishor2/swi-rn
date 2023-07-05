// import {utilsReducer} from './utils.slice';
// import {authReducer} from './auth.slice';
// import {userProfileReducer} from './userProfile.slice';
// import {restaurentReducer} from './restaurent.slice';
// import {favouriteSliceReducer} from './favouriteItem.slice';
// import {nutritionSliceReducer} from './nutritionData.slice';
// import {explorereducer} from './exploreData.slice';
// import {rewindReducer} from './rewind.slice';
// import {cookingreducer} from './cooking.slice';
// import {contactUsreducer} from './contactUs.slice';
// import {ProfileQuestionreducer} from './profileQue.slice';
// import {settingsReducer} from './settings.slice';
// import {localSliceReducer} from './local.slice';

// const rootReducer = {
//   utilsReducer,
//   authReducer,
//   cookingreducer,
//   userProfileReducer,
//   restaurentReducer,
//   favouriteSliceReducer,
//   nutritionSliceReducer,
//   explorereducer,
//   rewindReducer,
//   contactUsreducer,
//   ProfileQuestionreducer,
//   settingsReducer,
//   localSliceReducer,
// };

// export default rootReducer;

import {combineReducers} from '@reduxjs/toolkit';
import {AuthReducer} from './auth.slice';
import {exploreReducer} from './explore.slice';
import frehFindsReducer from './freshFinds.slice';

const combineReducer = combineReducers({
  AuthReducer,
  exploreReducer,
  frehFindsReducer,
});

export default combineReducer;
