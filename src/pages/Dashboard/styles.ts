import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Itens } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 200px;
  background-color: #282828;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Bold';
  color: #fff;
  font-size: 24px;
  margin: 20px 0px 0px 20px;
`;

export const Category = styled.TouchableOpacity`
  background-color: #f49328;
  width: 62px;
  height: 62px;
  margin-top: 10px;
  margin-left: 14px;
  border-radius: 8px;
  align-items: center;
  padding: 2px;
  justify-content: center;
`;

export const CategoryText = styled.Text`
  font-family: 'Poppins-Bold';
  position: absolute;
  top: 70px;
  margin: auto;
  color: #ffffff;
  width: 140%;
  text-align: center;
  font-size: 13px;
`;

export const ContainerMain = styled.View`
  position: absolute;
  flex-direction: row;
  top: 60px;
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
