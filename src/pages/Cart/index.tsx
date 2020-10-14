import React, { useCallback, useRef, useState } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, ToastAndroid } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import api from '../../services/api';
import Input from '../../components/Input';
import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  TextQuantity,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ContainerObs,
  ActionContainer,
  ActionButton,
  ProductDesc,
  Finish,
  FinishText,
} from './styles';

import FloatingCart from '../../components/FloatingCart';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';

export interface Itens {
  id: string;
  preco: number;
  // eslint-disable-next-line camelcase
  quantity: number;
}
interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  numero: number;
  cpf: number;
}

interface Observacao {
  observacao?: string;
}

const Cart: React.FC = () => {
  // const [itensData, setItensData] = useState<Itens[]>([]);
  const { increment, decrement, itens } = useCart();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const [dadosUser, setDadosUser] = useState<User[]>([]);
  const [itensCart, setItensCart] = useState<Itens[]>([]);
  const [obs, setObs] = useState('Nenhuma');

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const handleFinishPedido = useCallback(
    async (data: Observacao) => {
      try {
        // eslint-disable-next-line no-unused-expressions
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          observacao: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.observacao) {
          setObs(data.observacao);
        }

        const userDados = await AsyncStorage.getItem('@Foodtime:userDados');
        if (userDados) {
          setDadosUser(JSON.parse(userDados));
        }

        const itensCartData = await AsyncStorage.getItem('@Foodtime:itens');
        if (itensCartData) {
          setItensCart(JSON.parse(itensCartData));
        }

        const valorCart = await AsyncStorage.getItem('@Foodtime:cartTotal');

        // console.log(obs);
        // console.log(itensCart[0].descritivo);
        // console.log(dadosUser[0].id);
        // console.log(valorCart);

        if (valorCart !== 0) {
          try {
            await api.post('pedido', {
              user_id: dadosUser[0].id,
              valortotal: valorCart,
              observacao: obs,
              itens: [
                itensCart.map(i => {
                  i.id, i.quantity, i.preco;
                }),
              ],
            });
            ToastAndroid.showWithGravity(
              'Pedido realizado',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } catch (err) {
            ///
          }
        } else {
          ToastAndroid.showWithGravity(
            'Carrinho Vazio',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }

        // if (itensCart[1] && valorCart[1]) {
        //   const response = await api.post('pedido', {
        //     user_id: dadosUser[0].id,
        //     valortotal: valorCart[1],
        //     observacao: data.observacao,
        //     itens: JSON.stringify(itensCart),
        //   });
        //   console.log(response.data);
        // }

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
      } catch (err) {
        //
      }
    },
    [itensCart, dadosUser, obs],
  );

  return (
    <>
      <Container>
        <ProductContainer>
          <SafeAreaView style={{ flex: 1 }}>
            <ProductList
              data={itens}
              keyExtractor={item => item.id}
              ListFooterComponent={<View />}
              renderItem={({ item }: { item: Itens }) => (
                <Product>
                  <ProductTitleContainer>
                    <ProductTitle>{item.titulo}</ProductTitle>
                    <ProductPriceContainer>
                      <ProductDesc>{item.descritivo}</ProductDesc>
                      <ProductSinglePrice>{`R$ ${item.preco},00 (uni)`}</ProductSinglePrice>

                      <TotalContainer>
                        <ProductPrice>
                          {`Subtotal: R$ ${item.preco * item.quantity},00`}
                        </ProductPrice>
                      </TotalContainer>
                    </ProductPriceContainer>
                  </ProductTitleContainer>
                  <ActionContainer>
                    <ActionButton
                      testID={`increment-${item.id}`}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <FeatherIcon name="plus" color="#282828" size={16} />
                    </ActionButton>
                    <TextQuantity>{item.quantity}</TextQuantity>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={() => handleDecrement(item.id)}
                    >
                      <FeatherIcon name="minus" color="#282828" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </Product>
              )}
            />

            <Form ref={formRef} onSubmit={handleFinishPedido}>
              <ContainerObs>
                <Input
                  autoCapitalize="words"
                  name="observacao"
                  icon="edit-3"
                  multiline
                  placeholder="Alguma observação?"
                  returnKeyType="next"
                />
              </ContainerObs>
            </Form>
          </SafeAreaView>
        </ProductContainer>
      </Container>
      <FloatingCart />
      <Finish
        onPress={() => {
          // eslint-disable-next-line no-unused-expressions
          formRef.current?.submitForm();
        }}
      >
        <FinishText>Finalizar pedido</FinishText>
      </Finish>
    </>
  );
};

export default Cart;
