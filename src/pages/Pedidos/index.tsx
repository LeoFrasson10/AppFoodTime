/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Image, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

// import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { SafeAreaView } from 'react-navigation';
import {
  Container,
  Text,
  Header,
  ContainerMain,
  Product,
  ProductTitle,
  PriceContainer,
  ProductPrice,
  ProductButton,
  ProductContainer,
  DescriptionContainer,
  Description,
  ProductCancel,
  ItensList,
  ProductNameStatus,
  ProductStatus,
  StatusContainer,
  CartClean,
  CartCleanContainerTitle,
  CartCleanTitle,
} from './styles';

import Navigation from '../../components/Navigation';

import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';
// import Input from '../../components/Input';
import api from '../../services/api';

export interface Pedido {
  id: string;
  data: string;
  hora: string;
  status: string;
  valortotal: string;
}

const Dashboard: React.FC = () => {
  // const formRef = useRef<FormHandles>();

  // const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cancelado, setCancelado] = useState('');

  const loadUser = useCallback(async () => {
    const userDados = await AsyncStorage.getItem('@Foodtime:userDados');
    if (userDados) {
      const { id } = JSON.parse(userDados)[0];

      try {
        const valor = await api.get(`/pedido/${id}`);
        setPedidos(valor.data);
      } catch {
        console.log('erro');
      }
    }

    //
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleDetails = useCallback(() => {
    console.log('detalhe');
  }, []);

  async function handleCancel(item: Pedido): Promise<void> {
    try {
      const cancel = await api.get(`/cancelarUser/${item.id}`);
    } catch {
      console.log('erro');
    }
    // addToCart(item);
    // ToastAndroid.showWithGravity(
    //   'Item adicionado ao carrinho!',
    //   ToastAndroid.SHORT,
    //   ToastAndroid.BOTTOM,
    // );
  }

  // const handlePratoFeito = useCallback(async () => {
  //   const valor = await api.get('/filter/1');
  //   setItens([]);
  //   setItens(valor.data);
  // }, [setItens]);

  return (
    <>
      <Container>
        <Header style={{ justifyContent: 'flex-start' }}>
          <ContainerMain>
            <Text>Meus Pedidos</Text>
          </ContainerMain>
        </Header>

        <ProductContainer>
          <SafeAreaView style={{ flex: 1 }}>
            {pedidos.length > 0 ? (
              <>
                <ItensList
                  data={pedidos}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }: { item: Pedido }) => {
                    return (
                      <Product key={item.id}>
                        <ProductTitle>
                          {`${format(new Date(item.data), 'dd/MM/yyyy')} às ${
                            item.hora
                          }`}
                        </ProductTitle>
                        <DescriptionContainer>
                          <Description>{`Valor total: R$ ${item.valortotal},00`}</Description>
                        </DescriptionContainer>
                        <PriceContainer>
                          {item.status === 'Pendente' ? (
                            <>
                              <StatusContainer>
                                <ProductPrice>{item.status}</ProductPrice>
                                <ProductCancel
                                  onPress={() => handleCancel(item)}
                                >
                                  <ProductPrice style={{ color: '#D91818' }}>
                                    Cancelar
                                  </ProductPrice>
                                </ProductCancel>
                              </StatusContainer>
                            </>
                          ) : (
                            <ProductStatus>
                              {item.status === 'Em Andamento' ? (
                                <ProductNameStatus style={{ color: '#282828' }}>
                                  {item.status}
                                </ProductNameStatus>
                              ) : item.status === 'Cancelado' ? (
                                <ProductPrice style={{ color: '#D91818' }}>
                                  {item.status}
                                </ProductPrice>
                              ) : (
                                <ProductPrice>{item.status}</ProductPrice>
                              )}
                            </ProductStatus>
                          )}

                          <ProductButton onPress={handleDetails}>
                            <Icon size={30} name="arrow-right" color="#000" />
                          </ProductButton>
                        </PriceContainer>
                      </Product>
                    );
                  }}
                />
              </>
            ) : (
              <>
                <CartClean>
                  <CartCleanContainerTitle>
                    <CartCleanTitle>Nenhum pedido encontrado :|</CartCleanTitle>
                  </CartCleanContainerTitle>
                </CartClean>
              </>
            )}
          </SafeAreaView>
        </ProductContainer>
      </Container>
      <Navigation />
    </>
  );
};

export default Dashboard;
