import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: 'Poppins-Medium';
  margin: 25px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
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

export const BackToSignInText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
  font-size: 18px;
`;

export const Campo = styled.View`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const Value = styled.Text`
  flex: 1;
  margin-top: 5px;
  color: #000;
  font-size: 18px;
  font-family: 'Poppins-Regular';
`;

export const ObsAlterDados = styled.Text`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 10px;
  font-family: 'Poppins-Regular';
`;
