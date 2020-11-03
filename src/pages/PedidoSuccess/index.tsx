import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-navigation';

import Icon from 'react-native-vector-icons/Feather';
// import Button from '../../components/Button';
import {
  Container,
  Title,
  ButtonPedidos,
  ButtonInicio,
  Text,
  TextInicio,
  SubTitle,
} from './styles';

const PedidoSuccess: React.FC = () => {
  const navigation = useNavigation();

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
              <Icon name="check-circle" size={100} color="green" />
              <Title>Pedido realizado com sucesso!</Title>
              <SubTitle>
                Acompanhe seu pedido em meus pedidos ou em média de 10 minutos
                seu pedido ficará pronto
              </SubTitle>
              <ButtonPedidos
                rippleColor="#ffc747"
                onPress={() => {
                  navigation.navigate('Pedidos');
                }}
              >
                <Text>Meus pedidos</Text>
              </ButtonPedidos>
              <ButtonInicio
                rippleColor="#c7c7c7"
                onPress={() => {
                  navigation.navigate('Dashboard');
                }}
              >
                <TextInicio>Início</TextInicio>
              </ButtonInicio>
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default PedidoSuccess;
