import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { Container, SignIn, SignInText } from './styles';

import { useAuth } from '../../hooks/auth';

const Navigation: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <Container>
      <SignIn onPress={() => navigation.navigate('Dashboard')}>
        <SignInText>
          <Icon name="home" size={25} color="#ff9600" />
        </SignInText>
      </SignIn>
      {user ? (
        <>
          <SignIn onPress={() => navigation.navigate('Cart')}>
            <SignInText>
              <Icon name="shopping-cart" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
          <SignIn
            onPress={() => {
              navigation.navigate('Pedidos');
            }}
          >
            <SignInText>
              <Icon name="shopping-bag" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
          <SignIn
            onPress={() => {
              navigation.navigate('Profile');
            }}
          >
            <SignInText>
              <Icon name="user" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
        </>
      ) : (
        <>
          <SignIn
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <SignInText>
              <Icon name="shopping-cart" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
          <SignIn
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <SignInText>
              <Icon name="shopping-bag" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
          <SignIn
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <SignInText>
              <Icon name="user" size={25} color="#ff9600" />
            </SignInText>
          </SignIn>
        </>
      )}

      {/* <SignInText>
            <Icon name="user" size={25} color="#ff9600" />
          </SignInText>
        </SignIn> */}
    </Container>
  );
};

export default Navigation;
