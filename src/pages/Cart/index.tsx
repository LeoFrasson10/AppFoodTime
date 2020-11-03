/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { View, ToastAndroid, Alert } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

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
  CartClean,
  CartCleanContainerTitle,
  CartCleanTitle,
} from './styles';

import FloatingCart from '../../components/FloatingCart';
import { useCart } from '../../hooks/cart';
import { useAuth } from '../../hooks/auth';
import Navigation from '../../components/Navigation';

export interface Itens {
  id: string;
  titulo: string;
  descritivo: string;
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
  const { increment, decrement, itens, clean } = useCart();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const navigation = useNavigation();

  const [dadosUser, setDadosUser] = useState<User[]>([]);
  const [itensCart, setItensCart] = useState<Itens[]>([]);
  const [obs, setObs] = useState('Nenhuma');

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  useEffect(() => {
    async function loadItensData(): Promise<void> {
      // const user = await AsyncStorage.getItem('@Foodtime:user');
      // setUserEmail(user);

      if (itens) {
        setItensCart(itens);
      }
    }

    loadItensData();
  }, [itens]);

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

        const valorCart = await AsyncStorage.getItem('@Foodtime:cartTotal');

        // console.log(obs);
        // console.log(itensCart[0].descritivo);
        // console.log(dadosUser[0].id);
        // console.log(valorCart);

        if (Number(valorCart) !== 0) {
          try {
            const response = await api.post('pedido', {
              user_id: dadosUser[0].id,
              valortotal: valorCart,
              observacao: obs,
              itens: itensCart.map(i => {
                return {
                  itens_id: i.id,
                  quantidade: i.quantity,
                  preco: i.preco,
                };
              }),
            });
            if (response) {
              // ToastAndroid.showWithGravity(
              //   'Pedido realizado',
              //   ToastAndroid.SHORT,
              //   ToastAndroid.BOTTOM,
              // );
              // Alert.alert(
              //   'Pedido realizado com sucesso!',
              //   'O que deseja fazer?',
              //   [
              //     {
              //       text: 'Ver pedidos',
              //       onPress: () => navigation.navigate('Pedidos'),
              //     },
              //     {
              //       text: 'Ir para o início',
              //       onPress: () => navigation.navigate('Dashboard'),
              //     },
              //   ],
              // );
              navigation.navigate('PedidoSuccess');
              clean();
            }

            // await AsyncStorage.multiRemove([
            //   '@Foodtime:cartTotal',
            //   '@Foodtime:itens',
            // ]);
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
      } catch (err) {
        //
      }
    },
    [itensCart, dadosUser, obs, clean, navigation],
  );

  return (
    <>
      <Container>
        <ProductContainer>
          <SafeAreaView style={{ flex: 1 }}>
            {itens.length > 0 ? (
              <>
                <ProductList
                  data={itens}
                  keyExtractor={(item, index) => index.toString()}
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
              </>
            ) : (
              <>
                <CartClean>
                  <CartCleanContainerTitle>
                    <CartCleanTitle>Carrinho vazio</CartCleanTitle>
                  </CartCleanContainerTitle>
                </CartClean>
              </>
            )}
          </SafeAreaView>
        </ProductContainer>
      </Container>
      <FloatingCart />
      <Finish
        onPress={() => {
          if (itens.length > 0) {
            formRef.current?.submitForm();
          } else {
            ToastAndroid.showWithGravity(
              'Carrinho Vazio',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          }
        }}
      >
        <FinishText>Finalizar pedido</FinishText>
      </Finish>
      <Navigation />
    </>
  );
};

export default Cart;
