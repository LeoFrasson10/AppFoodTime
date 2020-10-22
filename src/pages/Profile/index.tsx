import React, { useRef, useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
// import Icon from 'react-native-vector-icons/Feather';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo_maior.png';
import api from '../../services/api';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  Campo,
  Icon,
  Value,
  ObsAlterDados,
} from './styles';

interface User {
  nome: string;
  sobrenome: string;
  email: string;
  numero: number;
  cpf: number;
}

const Profile: React.FC = () => {
  const navigation = useNavigation();
  // const [userEmail, setUserEmail] = useState<string | null>();
  const [userData, setUserData] = useState<User[]>([]);
  const { clean } = useCart();
  const { signOut } = useAuth();

  const handleLogOut = useCallback(async () => {
    await AsyncStorage.removeItem('@Foodtime:cartTotal');
    signOut();
    clean();
  }, [signOut, clean]);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      // const user = await AsyncStorage.getItem('@Foodtime:user');
      // setUserEmail(user);
      const userDados = await AsyncStorage.getItem('@Foodtime:userDados');
      if (userDados) {
        setUserData(JSON.parse(userDados));
      }
    }
    loadStorageData();
  }, []);

  // const loadUser = useCallback(() => {
  //   api.get(`user/${userEmail}`).then(response => {
  //     setUserData(response.data);
  //   });
  // }, [userEmail, setUserData]);

  // useEffect(() => {
  //   loadUser();
  // });
  // eslint-disable-next-line no-console
  // console.log(userData[0].nome);
  // eslint-disable-next-line no-console
  console.log(userData);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <Title>Meus dados</Title>

            <Campo>
              <Icon name="user" size={24} />
              <Value>
                {`${userData.length > 0 ? userData[0].nome : ''} ${
                  userData.length > 0 ? userData[0].sobrenome : ''
                }`}
              </Value>
            </Campo>
            <Campo>
              <Icon name="mail" size={24} />
              <Value>{userData.length > 0 ? userData[0].email : ''}</Value>
            </Campo>
            <Campo>
              <Icon name="smartphone" size={24} />
              <Value>{userData.length > 0 ? userData[0].numero : ''}</Value>
            </Campo>
            <Campo>
              <Icon name="archive" size={24} />
              <Value>{userData.length > 0 ? userData[0].cpf : ''}</Value>
            </Campo>
            <ObsAlterDados>
              *Para alterar seus dados acessar o site www.foodtime.com.br
            </ObsAlterDados>
            <Button onPress={handleLogOut}>Sair</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default Profile;
