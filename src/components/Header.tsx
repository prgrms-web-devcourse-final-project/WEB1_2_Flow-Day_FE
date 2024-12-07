import { svg } from '@/assets/icons/svg';
import HomePage from '@/pages/home-page/HomePage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ROUTES } from '@/constants/routes';
import styled from 'styled-components/native';
import { navigationRef } from '../../App';

type HeaderProps = {
  children: React.ReactNode;
};

const Container = styled.View`
  background-color: #ffffff;
  padding: 16px 14px;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const HeaderText = styled.Text`
  position: absolute;
  width: fit-content;
  font-size: 16px;
  left: 50%;
  margin-left: calc((-17px - 24px) / 2);
`;

const LogoImage = styled.View`
  margin-right: auto;
`;

const AlertImage = styled.View`
  margin-left: auto;
`;

export default function Header({ children }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigationRef.navigate(ROUTES.HOME as never)}
      >
        <LogoImage>
          <SvgXml xml={svg.logo} />
        </LogoImage>
      </TouchableOpacity>
      <HeaderText>{children}</HeaderText>
      <AlertImage>
        <TouchableOpacity>
          <SvgXml xml={svg.alert} />
        </TouchableOpacity>
      </AlertImage>
    </Container>
  );
}
