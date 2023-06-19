import {useState, useEffect, useRef} from 'react';
import {BackHandler} from 'react-native';
import {createNavigationContainerRef} from '@react-navigation/native';

export const RootNavigation = {
  navigate(_name, _params) {},
  goBack() {},
  resetRoot(_state) {},
  getRootState() {
    return {};
  },
  dispatch(_action) {},
};

export const navigationRef = createNavigationContainerRef();

export function getActiveRouteName(state) {
  const route = state.routes[state.index];
  if (!route.state) return route.name;
  return getActiveRouteName(route.state);
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(canExit) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }
      const routeName = getActiveRouteName(navigationRef.getRootState());
      if (canExitRef.current(routeName)) {
        return false;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage, persistenceKey) {
  const [initialNavigationState, setInitialNavigationState] = useState();
  e;
  const [isRestored, setIsRestored] = useState(!__DEV__);

  const routeNameRef = useRef();

  const onNavigationStateChange = state => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      __DEV__ &&
        console.log(
          '%c Current Route Name: ' + currentRouteName,
          'color: green; font-weight:bold',
        );
    }
    routeNameRef.current = currentRouteName;
    storage.save(persistenceKey, state);
  };

  const restoreState = async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) setInitialNavigationState(state);
    } finally {
      setIsRestored(true);
    }
  };

  useEffect(() => {
    if (!isRestored) restoreState();
  }, [isRestored]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = {index: 0, routes: []}) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}
