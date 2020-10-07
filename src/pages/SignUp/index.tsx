import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { cpf as cpfCnpj } from 'cpf-cnpj-validator';
import {
  Image,
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
import Button from '../../components/Button';
import logoImg from '../../assets/logo_maior.png';

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

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>();
  const navigation = useNavigation();

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
          nome: Yup.string().required('Nome obrigatório'),
          sobrenome: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          numero: Yup.number().required('Celular obrigatório').integer(),
          cpf: Yup.number().required('Cpf obrigatório').integer(),
          password: Yup.string().min(6, 'No minimo 6 digitos'),
        });
        const userCpf = data.cpf;

        const ok = cpfCnpj.isValid(userCpf);

        if (ok) {
          await schema.validate(data, {
            abortEarly: false,
          });

          await api.post('/register', data);

          Alert.alert(
            'Cadastro realizado com sucesso!',
            'Você já pode fazer login na aplicação',
          );
          navigation.goBack();
        } else {
          Alert.alert('CPF inválido', 'Insira um CPF válido');
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.log(err);
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

            <Title>Faça seu cadastro</Title>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="nome"
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
                name="sobrenome"
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
                name="numero"
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
                textContentType="newPassword"
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
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignIn;
