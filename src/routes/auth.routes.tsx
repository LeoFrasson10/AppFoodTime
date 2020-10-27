import React, { useEffect, useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';
import Logo from '../assets/logo.png';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Cart from '../pages/Cart';

import Profile from '../pages/Profile';
import Pedidos from '../pages/Pedidos';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTransparent: true,
      headerStyle: { backgroundColor: '#282828' },
      cardStyle: { backgroundColor: '#282828' },
    }}
  >
    <Auth.Screen
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

    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        cardStyle: { backgroundColor: '#282828' },
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Cart"
      component={Cart}
    />
  </Auth.Navigator>
);

export default AuthRoutes;
