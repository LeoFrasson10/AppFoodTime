import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
  Finish,
  FinishText,
} from './styles';

// Calculo do total
// Navegação no clique do TouchableHighlight
import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
  const { itens } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const total = itens.reduce((accumulator, item) => {
      const itensSubtotal = item.preco * item.quantity;

      return accumulator + itensSubtotal;
    }, 0);

    return total;
  }, [itens]);

  const totalItensInCart = useMemo(() => {
    const total = itens.reduce((accumulator, item) => {
      const itensQuantity = item.quantity;

      return accumulator + itensQuantity;
    }, 0);

    return total;
  }, [itens]);
  return (
    <>
      <Container>
        <CartButton testID="navigate-to-cart-button">
          <FeatherIcon name="shopping-cart" size={24} color="#fff" />
          <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
        </CartButton>

        <CartPricing>
          <CartTotalPrice>{`R$ ${cartTotal},00`}</CartTotalPrice>
        </CartPricing>
      </Container>
      <Finish>
        <FinishText>Finalizar pedido</FinishText>
      </Finish>
    </>
  );
};

export default FloatingCart;
