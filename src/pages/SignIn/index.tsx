import React, { useCallback, useRef, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  ToastAndroid,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import { SafeAreaView } from 'react-navigation';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo_maior.png';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        // const consulta = await api.post('login', {
        //   email: data.email,
        //   password: data.password,
        // });

        // if (!consulta.data) {
        //   console.log('Não tem');
        //   await AsyncStorage.clear();
        // } else {
        //   const { token } = consulta.data;
        //   const userDados = await api.get(`user?token=${token}`);

        // if (userDados.data) {
        //   await AsyncStorage.setItem(
        //     '@Foodtime:user',
        //     JSON.stringify(userDados.data),
        //   );
        //   await AsyncStorage.setItem('@Foodtime:token', token);

        ToastAndroid.showWithGravity(
          'Login realizado com sucesso! Bem vindo!!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [signIn],
  );
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
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

              <Title>Faça seu login</Title>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    passwordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordInputRef}
                  secureTextEntry
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    // eslint-disable-next-line no-unused-expressions
                    formRef.current?.submitForm();
                  }}
                />

                <Button
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    formRef.current?.submitForm();
                  }}
                >
                  Entrar
                </Button>
              </Form>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#ff9600" />
          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
