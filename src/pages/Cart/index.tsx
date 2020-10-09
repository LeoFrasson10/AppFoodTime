import React, { useMemo } from 'react';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
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
  ProductQuantity,
  ActionContainer,
  ActionButton,
  ProductDesc,
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

const SignIn: React.FC = () => {
  const { increment, decrement, itens } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  return (
    <>
      <Container>
        <ProductContainer>
          <ProductList
            data={itens}
            keyExtractor={item => item.id}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{
              height: 130,
            }}
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
        </ProductContainer>
      </Container>
      <FloatingCart />
    </>
  );
};

export default SignIn;
