import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Poppins-Medium';
  margin: 24px;
  text-align: center;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  color: #fff;
  font-family: 'Poppins-Regular';
  margin-bottom: 18px;
  text-align: center;
`;

export const Text = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Poppins-Medium';
  padding: 10px;
  text-align: center;
`;

export const TextInicio = styled.Text`
  font-size: 24px;
  color: #f49328;
  font-family: 'Poppins-Medium';
  padding: 10px;
  text-align: center;
`;

export const ButtonPedidos = styled(RectButton)`
  background-color: #f49328;
  width: 80%;
  margin-bottom: 20px;
  border-radius: 15px;
`;

export const ButtonInicio = styled(RectButton)`
  border-radius: 15px;
  background-color: #fafafa;
  width: 80%;
`;
