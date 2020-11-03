import React, { useEffect, useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../assets/logo.png';

import Dashboard from '../pages/Dashboard';
// import DashboardAuth from '../pages/DashboardAuth';

import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Pedidos from '../pages/Pedidos';
import PedidoSuccess from '../pages/PedidoSuccess';

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
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: false,
        cardStyle: { backgroundColor: '#F49328' },
        headerTitle: () => <Image source={Logo} />,
        headerStyle: { backgroundColor: '#282828', elevation: 0 },
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        cardStyle: { backgroundColor: '#282828' },
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Cart"
      component={Cart}
    />
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        cardStyle: { backgroundColor: '#282828' },
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Pedidos"
      component={Pedidos}
    />
    <App.Screen name="PedidoSuccess" component={PedidoSuccess} />
  </App.Navigator>
);

export default AppRoutes;
