import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom: 53px;

  flex-direction: row;
  background: #f49328;

  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
`;

export const CartPricing = styled.Text`
  padding: 20px;
`;

export const CartTotalPrice = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;

export const CartButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #f49328;

  flex: 1;
  padding: 20px 20px;
  justify-content: space-between;
  align-items: center;
`;

export const CartButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
  margin-left: 15px;
  flex: 1;
  margin-right: auto;
`;

export const Finish = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f42828;
  border-top-width: 0px;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const FinishText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
`;
