import React from 'react';
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

const FloatingCart: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <CartButton
          testID="navigate-to-cart-button"
          onPress={() => navigation.navigate('Cart')}
        >
          <FeatherIcon name="shopping-cart" size={24} color="#fff" />
          <CartButtonText>5 Itens</CartButtonText>
        </CartButton>

        <CartPricing>
          <CartTotalPrice>Total R$ 25,00</CartTotalPrice>
        </CartPricing>
      </Container>
      <Finish>
        <FinishText>Finalizar pedido</FinishText>
      </Finish>
    </>
  );
};

export default FloatingCart;
