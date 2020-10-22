import AsyncStorage from '@react-native-community/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import { View, ToastAndroid } from 'react-native';
// import { Form } from '@unform/mobile';
// import { FormHandles } from '@unform/core';
// import * as Yup from 'yup';
// import AsyncStorage from '@react-native-community/async-storage';

// import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
import api from '../../services/api';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductTitle,
  ProductPrice,
  PriceContainer,
  ProductButton,
  DescriptionContainer,
  Description,
  ItensList,
  Finish,
  FinishText,
} from './styles';

// import FloatingCart from '../../components/FloatingCart';
// import { useCart } from '../../hooks/cart';
// import { useAuth } from '../../hooks/auth';

export interface Pedido {
  id: number;
  valorTotal: number;
  status: string;
  observacao: string;
  data: string;
  itens: Array<{
    idIp: number;
    itensId: number;
    quantidade: number;
  }>;
}
interface User {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  numero: number;
  cpf: number;
}

const Pedidos: React.FC = () => {
  const [pedidosData, setPedidosData] = useState<Pedido[]>([]);
  const [dadosUser, setDadosUser] = useState<User[]>([]);
  // const { user } = useAuth()

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const userDados = await AsyncStorage.getItem('@Foodtime:userDados');

      if (userDados) {
        setDadosUser(JSON.parse(userDados));
      }
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    if (dadosUser[0]) {
      console.log(dadosUser[0].id);
      // api.get(`/pedido/${dadosUser[0].id}/`).then(response => {
      //   setPedidosData(response.data);
      // });
    }
  }, [dadosUser]);

  return (
    <>
      <Container>
        {/* <ProductContainer>
           <ItensList
            data={pedidosData}
            keyExtractor={pedido => pedido}
            renderItem={({ pedido }: { pedido: Pedido }) => {
              return (
                <Product key={pedido.id}>
                  <ProductTitle>{pedido.data}</ProductTitle>
                  <DescriptionContainer>
                    <Description>{pedido.observacao}</Description>
                  </DescriptionContainer>
                  <PriceContainer>
                    <ProductPrice>{`R$ ${pedido.valorTotal},00`}</ProductPrice>
                    {/* <ProductButton onPress={() => handleAddToCart(item)}>
                      <Icon size={30} name="plus" color="#000" />
                    </ProductButton>
                  </PriceContainer>
                </Product>
              );
            }}
          />
        </ProductContainer> */}
      </Container>

      <Finish onPress={() => {}}>
        <FinishText>Pedidos</FinishText>
      </Finish>
    </>
  );
};

export default Pedidos;
