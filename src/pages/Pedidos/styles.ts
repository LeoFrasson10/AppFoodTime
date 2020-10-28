import styled from 'styled-components/native';
import { FlatList, Button } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Pedido } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 120px;
  background-color: #282828;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;

  flex-direction: row;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Bold';
  color: #fff;
  font-size: 25px;
`;

export const ContainerMain = styled.View`
  margin: auto;

  top: 35px;
`;

export const Title = styled.Text`
  text-align: center;
  font-family: 'Poppins-Bold';
  color: #fff;
  font-size: 22px;
  margin-bottom: 10px;
`;

export const ProductContainer = styled.View`
  border-radius: 5px;
  flex: 1;
  flex-direction: row;
  margin-bottom: 60px;
`;

export const ProductList = styled.View`
  flex: 1;

  padding: 0 20px;
`;

export const Product = styled.View`
  background: #fff;
  padding: 16px 16px;
  border-radius: 10px;
  margin: 8px;
  flex: 1;
`;

export const ProductTitle = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-left: -30px;
  font-family: 'Poppins-Bold';
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: auto;
`;

export const ProductPrice = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 18px;
  color: #f49328;
  margin-right: 10px;
`;

export const ProductNameStatus = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 18px;
  color: #000;
`;

export const ProductButton = styled.TouchableOpacity`
  margin-top: -60px;
`;
export const ProductCancel = styled.TouchableOpacity`
  margin: auto;
  padding: 2px;
`;
export const ProductStatus = styled.TouchableOpacity`
  margin: auto;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: auto;

  width: 90%;
`;

export const Description = styled.Text`
  font-family: 'Poppins-Regular';
  margin: auto;
`;
export const ItensList = styled(FlatList as new () => FlatList<Pedido>)``;

export const CartClean = styled.View`
  background: #fff;
  padding: 15px 10px;
  border-radius: 5px;
  width: 90%;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
`;

export const CartCleanContainerTitle = styled.View`
  font-size: 16px;
  margin-left: 5px;
  height: 80px;
  margin: auto;
`;

export const CartCleanTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin: auto;
  color: #000;
`;

export const ButtonFechar = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f42828;
  border-top-width: 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TextFechar = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin: auto;
  color: #fff;
`;
