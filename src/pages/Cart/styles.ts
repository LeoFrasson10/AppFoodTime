import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: 5%;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  margin-top: 60px;
  flex: 1;
  flex-direction: row;
`;

export const ProductList = styled(FlatList)`
  flex: 1;
  margin-bottom: 10px;
  padding: 0 10px;
`;

export const ContainerObs = styled.View`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 120px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  margin: 5px;
  flex-direction: row;
`;

export const ProductTitleContainer = styled.View`
  font-size: 16px;
  margin-left: 5px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const ProductPriceContainer = styled.View`
  flex-direction: column;
`;

export const TotalContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const ProductSinglePrice = styled.Text`
  font-size: 12px;
  color: #a0a0b3;
  margin-top: 8px;
`;

export const ProductDesc = styled.Text`
  font-size: 12px;
  width: 280px;
  color: #282828;
  margin-top: 8px;
`;
export const ProductPrice = styled.Text`
  font-weight: bold;
  margin-top: 20px;
  font-size: 16px;
  color: #000;
`;

export const ProductQuantity = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 16px;
  color: #f42828;
`;

export const ActionContainer = styled.View`
  align-self: flex-end;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
`;

export const ActionButton = styled.TouchableOpacity`
  background: rgba(40, 40, 40, 0.1);
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 5px;
`;
export const TextQuantity = styled.Text`
  background: rgba(40, 40, 40, 0.01);
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
`;

export const CartClean = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;

  margin: 5px;
  flex-direction: row;
`;

export const CartCleanContainerTitle = styled.View`
  font-size: 16px;
  margin-left: 5px;
  height: 80px;
  margin: auto;
`;

export const CartCleanTitle = styled.Text`
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  margin: auto;
  color: #000;
`;

export const Finish = styled(RectButton)`
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

export const TextInputPayment = styled.TextInput`
  border-radius: 10px;
`;
