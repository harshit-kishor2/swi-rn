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
