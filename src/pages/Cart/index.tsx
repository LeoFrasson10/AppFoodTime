import React, { useCallback, useRef } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-navigation';
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

export interface Itens {
  id: string;
  titulo: string;
  descritivo: string;
  preco: number;
  // eslint-disable-next-line camelcase
  categorias_id: string;
  quantity: number;
}

interface Observacao {
  observacao: string;
}

const Cart: React.FC = () => {
  // const [itensData, setItensData] = useState<Itens[]>([]);
  const { increment, decrement, itens } = useCart();
  const formRef = useRef<FormHandles>(null);

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  // const handleFinishPedido = useCallback(async (data: Observacao) => {
  //   try {
  //     console.log(data.observacao);
  //   } catch (error) {
  //     //
  //   }
  //   // const totalStorage = await AsyncStorage.getItem('@Foodtime:itens');

  //   // if (data) {
  //   //   setItens([...JSON.parse(itensData)]);
  //   // }
  //   // console.log(totalStorage);
  // }, []);
  const handleFinishPedido = useCallback(async (data: Observacao) => {
    try {
      // eslint-disable-next-line no-unused-expressions
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        observacao: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data.observacao);

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
  }, []);

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
