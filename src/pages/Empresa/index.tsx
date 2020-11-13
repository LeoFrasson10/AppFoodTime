import React from 'react';

// import Icon from 'react-native-vector-icons/Feather';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo_maior.png';

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

const Empresa: React.FC = () => {
  const navigation = useNavigation();

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
            <Title>Sobre nós</Title>

            <Campo>
              <Icon name="target" size={24} />
              <Value>Missao</Value>
            </Campo>
            <Campo>
              <Icon name="eye" size={24} />
              <Value>Visão</Value>
            </Campo>
            <Campo>
              <Icon name="star" size={24} />
              <Value>Valor</Value>
            </Campo>
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

export default Empresa;
