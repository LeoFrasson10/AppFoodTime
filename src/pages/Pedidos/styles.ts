import styled from 'styled-components/native';
import { FlatList, TextInput } from 'react-native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  margin-top: 5%;
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
  font-family: 'Poppins-Bold';
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-top: auto;
`;

export const ProductPrice = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 18px;
  color: #000;
`;

export const ProductButton = styled.TouchableOpacity`
  margin-top: -60px;
`;

export const DescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: auto;

  width: 90%;
`;

export const Search = styled.TouchableOpacity`
  margin-top: -50px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Poppins-Bold';
  font-size: 14px;
  background-color: #f49328;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 8px;
`;

export const TextTodos = styled.Text`
  font-family: 'Poppins-Bold';
  color: #fff;
  font-size: 20px;
`;

export const Description = styled.Text`
  font-family: 'Poppins-Regular';
`;
export const ItensList = styled(FlatList as new () => FlatList<Itens>)``;

export const Finish = styled.TouchableOpacity`
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
