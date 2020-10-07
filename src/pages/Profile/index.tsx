import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
  nome: string;
  sobrenome: string;
  email: string;
  numero: number;
  cpf: number;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>();
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState<string | null>();
  const [userData, setUserData] = useState<SignUpFormData[]>([]);

  const surnameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const documentInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          surname: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          phone: Yup.number().required('Celular obrigatório').integer(),
          cpf: Yup.number().required('Cpf obrigatório').integer(),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/register', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação',
        );
        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          // eslint-disable-next-line no-unused-expressions
          formRef.current?.setErrors(errors);

          return;
        }

        // disparar um toast

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    },
    [navigation],
  );

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await AsyncStorage.getItem('@Foodtime:user');
      setUserEmail(user);
    }
    loadStorageData();
  }, [setUserEmail]);

  const loadUser = useCallback(() => {
    api.get(`user/${userEmail}`).then(response => {
      setUserData(response.data);
    });
  }, [userEmail, setUserData]);

  useEffect(() => {
    loadUser();
  });
  // eslint-disable-next-line no-console
  console.log(userEmail);
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
            <Title>Meu perfil</Title>
            <Form initialData={{}} ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  surnameInputRef.current?.focus();
                }}
              />
              <Input
                ref={surnameInputRef}
                autoCapitalize="words"
                name="surname"
                icon="user"
                placeholder="Sobrenome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                // value={JSON.parse(userEmail)}
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInputRef.current?.focus();
                }}
              />
              <Input
                ref={phoneInputRef}
                keyboardType="numeric"
                name="phone"
                icon="smartphone"
                placeholder="Celular"
                returnKeyType="next"
                onSubmitEditing={() => {
                  documentInputRef.current?.focus();
                }}
              />
              <Input
                ref={documentInputRef}
                keyboardType="numeric"
                name="cpf"
                icon="archive"
                placeholder="CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
            </Form>
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
