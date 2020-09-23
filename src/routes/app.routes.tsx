import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';
import Logo from '../assets/logo.png';

import DashboardAuth from '../pages/DashboardAuth';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerStyle: { backgroundColor: '#282828' },
      cardStyle: { backgroundColor: '#282828' },
    }}
    initialRouteName="DashboardAuth"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: false,
        cardStyle: { backgroundColor: '#F49328' },
        headerTitle: () => <Image source={Logo} />,
        headerStyle: { backgroundColor: '#282828', elevation: 0 },
      }}
      name="DashboardApp"
      component={DashboardAuth}
    />
  </App.Navigator>
);

export default AppRoutes;
