export const LoadingStatus = {
  NOT_LOADED: 'not-loaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'error',
};

export const RoutesName = {
  // PreLogin Screen
  WALK_THROUGH_SCREEN: 'WalkThroughScreen',
  CREATE_ACCOUNT_SCREEN: 'CreateAccountScreen',
  SIGNUP_SCREEN: 'SignupScreen',
  LOGIN_OPTIONS_SCREEN: 'LoginOptions',
  LOGIN_SCREEN: 'LoginScreen',
  FORGOT_PASSWORD_SCREEN: 'ForgetPassword',
  TERM_AND_CONDITION_SCREEN: 'TermAndConditions',

  // Tab
  EXPLORE_TAB: 'Explore',
  FRESH_FINDS_TAB: 'Fresh Finds',
  SELL_TAB: 'Sell',
  CHAT_TAB: 'Chat',
  PROFILE_TAB: 'Profile',

  //    Post Login
  MAIN_TAB_NAVIGATOR: 'TabNavigations',
  NOTIFICATION_SCREEN: 'NotificationScreen',
  PRODUCT_DETAILS: 'Product Details',
  SELLERSPROFILE_VIEWBYOWN:'Sellers Own Profile',
  COIN_HISTORY:'Coin History',

  // Sell Tab
  SELL_SCREEN1: 'Sell Screen1',
  SELL_SCREEN2: 'Sell Screen2',
  SELL_SCREEN3: 'Sell Screen3',
  SUCCESS_SCREEN: 'Success Screen',
  BOOST_SCREEN: 'Boost Screen',
};

export const Messages = {
  EMAIL_REQUIRED: 'Email is required.',
  EMAIL_NOT_VALID: 'Email is not valid.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_REGEX:
    'Password must have minimum 8 characters and contain at least 1 UPPERCASE, 1 lower case.',
  REGISTER_SUCCESS: 'Registration Successful. Please Login to proceed.',
  LOGIN_SUCCESS: 'Login successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
};
