import React, { useState, useMemo, useCallback, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

// Calculo do total
// Navegação no clique do TouchableHighlight
import { useCart } from '../../hooks/cart';

const FloatingCart: React.FC = () => {
  const { itens } = useCart();
  const [totalInCart, setTotalInCart] = useState('');
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

  const totalCart = useCallback(async () => {
    if (cartTotal >= 0) {
      await AsyncStorage.setItem(
        '@Foodtime:cartTotal',
        JSON.stringify(cartTotal),
      );
    }
  }, [cartTotal]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const valorTotal = await AsyncStorage.getItem('@Foodtime:cartTotal');

      if (valorTotal) {
        setTotalInCart(JSON.parse(valorTotal));
      }
    }

    totalCart();
    loadProducts();
  }, [totalCart, setTotalInCart]);

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
    </>
  );
};

export default FloatingCart;
