/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Image,
  ToastAndroid,
  ActivityIndicator,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

// import { FormHandles } from '@unform/core';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Text,
  TextDesc,
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
  ButtonFechar,
  TextFechar,
  ContainerModal,
  TextTituloDesc,
  TextTituloNumeroPedido,
  TextTituloDescNumero,
  TextTituloDescTotal,
  TextObservacao,
} from './styles';

import Navigation from '../../components/Navigation';

import { useAuth } from '../../hooks/auth';
import { useCart } from '../../hooks/cart';
// import Input from '../../components/Input';
import api from '../../services/api';
import Button from '../../components/Button';

export interface Pedido {
  id: string;
  data: string;
  hora: string;
  status: string;
  valortotal: string;
}

export interface InfoPedido {
  id: number;
  data: string;
  hora: string;
  status: string;
  valortotal: string;
  observacao: string;
  detalhe: Array<{
    id: number;
    pedidos_id: number;
    itens_id: number;
    quantidade: number;
    preco: number;
  }>;
  itens: Array<{
    id: number;
    titulo: string;
    descritivo: string;
  }>;
}

const Dashboard: React.FC = () => {
  // const formRef = useRef<FormHandles>();

  // const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [detalhePed, setDetalhePed] = useState<InfoPedido>('');
  const [cancelado, setCancelado] = useState('');
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const loadUser = useCallback(async () => {
    const userDados = await AsyncStorage.getItem('@Foodtime:userDados');
    setLoading(true);
    if (userDados) {
      const { id } = JSON.parse(userDados)[0];

      try {
        const valor = await api.get(`/pedido/${id}`);
        setPedidos(valor.data);
        setLoading(false);
      } catch {
        console.log('erro');
      }
    }

    //
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  async function handleDetails(item: InfoPedido): Promise<void> {
    const userDados = await AsyncStorage.getItem('@Foodtime:userDados');

    if (userDados) {
      const { id } = JSON.parse(userDados)[0];

      try {
        const data = await api.get(`/pedido/${id}/${item.id}`);
        setModalVisible(!isModalVisible);
        if (data) {
          setDetalhePed(data.data);
        } else {
          console.log('vazio');
        }
        // await api.get(`/cancelarUser/${item.id}`);
        // const attPedido = pedidos.map(ped => {
        //   if (ped.id === item.id) {
        //     // eslint-disable-next-line no-param-reassign
        //     ped.status = 'Cancelado';
        //   }
        //   return ped;
        // });
        // setPedidos([]);
        // setPedidos(attPedido);
      } catch {
        console.log('erro');
      }
    }
  }

  const handleFecharModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const confirmCancel = useCallback(
    item => {
      Alert.alert(
        'Cancelar pedido',
        'Deseja cancelar seu pedido?',
        [
          {
            text: 'Não',
            onPress: () => console.log('negado'),
            style: 'cancel',
          },
          // eslint-disable-next-line no-use-before-define
          { text: 'Sim', onPress: () => handleCancel(item) },
        ],
        { cancelable: false },
      );
    },
    // eslint-disable-next-line no-use-before-define
    [handleCancel],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleCancel(item: Pedido): Promise<void> {
    try {
      await api.get(`/cancelarUser/${item.id}`);
      const attPedido = pedidos.map(ped => {
        if (ped.id === item.id) {
          // eslint-disable-next-line no-param-reassign
          ped.status = 'Cancelado';
        }
        return ped;
      });
      setPedidos([]);
      setPedidos(attPedido);
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
      <View>
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <ContainerModal>
              <TextTituloDescNumero>
                {` Pedido #${detalhePed ? detalhePed.id : ''}`}
              </TextTituloDescNumero>
              {detalhePed ? (
                detalhePed.detalhe[0].itens_id === detalhePed.itens[0].id ? (
                  detalhePed.itens.map((d, i) => (
                    <>
                      <TextTituloDesc>{`${d.titulo} | ${detalhePed.detalhe[i].quantidade} x R$ ${detalhePed.detalhe[i].preco},00`}</TextTituloDesc>
                      <TextDesc>{`${d.descritivo}`}</TextDesc>
                    </>
                  ))
                ) : (
                  <TextDesc>Vazio</TextDesc>
                )
              ) : (
                <TextDesc>Erro</TextDesc>
              )}
              <TextObservacao>
                {`Observação: ${detalhePed ? detalhePed.observacao : ''}`}
              </TextObservacao>
              <TextTituloDescTotal>
                {` Valor total: R$ ${
                  detalhePed ? detalhePed.valortotal : ''
                },00`}
              </TextTituloDescTotal>
            </ContainerModal>

            <ButtonFechar onPress={handleFecharModal}>
              <TextFechar>Fechar</TextFechar>
            </ButtonFechar>
          </View>
        </Modal>
      </View>
      <Header style={{ justifyContent: 'flex-start' }}>
        <ContainerMain>
          <Text>Meus Pedidos</Text>
        </ContainerMain>
      </Header>
      <Container>
        <ProductContainer>
          <SafeAreaView style={{ flex: 1 }}>
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : pedidos.length > 0 ? (
              <>
                <ItensList
                  data={pedidos}
                  keyExtractor={(item, index) => index.toString()}
                  initialNumToRender={pedidos.length}
                  renderItem={({ item }) => {
                    return (
                      <Product key={item.id}>
                        <TextTituloNumeroPedido>
                          {` Pedido #${item.id}`}
                        </TextTituloNumeroPedido>
                        {item.status === 'Em Andamento' ? (
                          <ProductNameStatus style={{ color: '#2f00ff' }}>
                            {item.status}
                          </ProductNameStatus>
                        ) : item.status === 'Cancelado' ? (
                          <ProductPrice style={{ color: '#D91818' }}>
                            {item.status}
                          </ProductPrice>
                        ) : item.status === 'Pronto' ? (
                          <ProductPrice style={{ color: '#008116' }}>
                            {item.status}
                          </ProductPrice>
                        ) : item.status === 'Entregue' ? (
                          <ProductPrice style={{ color: '#282828' }}>
                            {item.status}
                          </ProductPrice>
                        ) : (
                          <ProductPrice>{item.status}</ProductPrice>
                        )}
                        {/* <ProductPrice>{item.status}</ProductPrice> */}
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
                                <ProductCancel
                                  onPress={() => confirmCancel(item)}
                                >
                                  <ProductPrice style={{ color: '#d91818' }}>
                                    Cancelar
                                  </ProductPrice>
                                </ProductCancel>
                              </StatusContainer>
                            </>
                          ) : (
                            <ProductStatus>
                              {/* {item.status === 'Em Andamento' ? (
                                <ProductNameStatus style={{ color: '#282828' }}>
                                  {item.status}
                                </ProductNameStatus>
                              ) : item.status === 'Cancelado' ? (
                                <ProductPrice style={{ color: '#D91818' }}>
                                  {item.status}
                                </ProductPrice>
                              ) : (
                                <ProductPrice>{item.status}</ProductPrice>
                              )} */}
                              <ProductPrice />
                            </ProductStatus>
                          )}

                          <ProductButton onPress={() => handleDetails(item)}>
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
                    <CartCleanTitle>Nenhum pedido encontrado :(</CartCleanTitle>
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
