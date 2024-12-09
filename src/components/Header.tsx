import {svg} from '@/assets/icons/svg';
import HomePage from '@/pages/home-page/HomePage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ROUTES} from '@/constants/routes';
import styled from 'styled-components/native';
import {navigationRef} from '../../App';
import AlertPage from '@/pages/alert-page/AlertPage';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

type HeaderProps = {
  children: React.ReactNode;
};

const Container = styled.View`
  background-color: #ffffff;
  padding: 15px 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const HeaderText = styled.Text`
  position: absolute;
  width: ${width}px;
  margin: auto;
  font-family: 'SCDream5';
  font-size: 16px;
  text-align: center;
`;

const LogoImage = styled.View`
  justify-content: center;
  align-items: center;
`;

const AlertImage = styled.View`
  justify-content: center;
  align-items: center;
`;

export default function Header({children}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity onPress={() => navigationRef.navigate(ROUTES.HOME as never)}>
        <LogoImage>
          <SvgXml xml={svg.logo} />
        </LogoImage>
      </TouchableOpacity>
      <HeaderText>{children}</HeaderText>
      <AlertImage>
        <TouchableOpacity
          onPress={() => {
            navigationRef.navigate('AlertPage'); // navigationRef를 통해 이동
          }}
        >
          <SvgXml xml={svg.alert} />
        </TouchableOpacity>
      </AlertImage>
    </Container>
  );
}
