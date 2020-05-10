import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginView from '@screens/Login/login-screen.view';
import HomeView from '@screens/Home/home-screen.view';
import FormView from '@screens/Home/form-screen.view';
import FilterView from '@screens/Home/filter-screen.view';

const HomeStack = createStackNavigator(
  {
    LoginView,
    HomeView,
    FormView,
    FilterView
  },
  {
    initialRouteName: 'LoginView',
    headerMode: 'null',
    mode: 'modal',
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Home: HomeStack,
    },
    {
      headerMode: 'none',
      mode: 'modal',
      defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    },
  ),
);
