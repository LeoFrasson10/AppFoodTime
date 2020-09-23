import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, SignIn, SignInText } from './styles';

const Navigation: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <SignIn onPress={() => navigation.navigate('Dashboard')}>
        <SignInText>
          <Icon name="home" size={25} color="#ff9600" />
        </SignInText>
      </SignIn>
      <SignIn onPress={() => navigation.navigate('Cart')}>
        <SignInText>
          <Icon name="shopping-cart" size={25} color="#ff9600" />
        </SignInText>
      </SignIn>
      <SignIn onPress={() => navigation.navigate('SignIn')}>
        <SignInText>
          <Icon name="shopping-bag" size={25} color="#ff9600" />
        </SignInText>
      </SignIn>
      <SignIn onPress={() => navigation.navigate('SignIn')}>
        <SignInText>
          <Icon name="user" size={25} color="#ff9600" />
        </SignInText>
      </SignIn>
    </Container>
  );
};

export default Navigation;
