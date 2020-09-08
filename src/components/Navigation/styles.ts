import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #282828;
  border-top-width: 1px;
  border-color: #181818;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const SignIn = styled.TouchableOpacity`
  padding: 0 16px;
  margin: 0px 15px 0 15px;
`;

export const SignInText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'Poppins-Regular';
`;
