import { svg } from '@/assets/icons/svg';
import React from 'react';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';

type HeaderProps = {
  children: React.ReactNode;
}

const Container = styled.View`
  background-color: #FFFFFF;
  padding: 16px 14px;
  flex-direction: row;
  align-items: center;
`

const HeaderText = styled.Text`
  position: absolute;
  width: fit-content;
  font-size: 16px;
  left: 50%;
  margin-left: calc((-17px - 24px) / 2);
`

const LogoImage = styled.View`
  margin-right: auto;
`

const AlertImage = styled.View`
  margin-left: auto;
`

export default function Header({children}: HeaderProps) {
  return (
    <Container>
      <LogoImage>
        <SvgXml xml={svg.logo} />
      </LogoImage>
      <HeaderText>{children}</HeaderText>
      <AlertImage>
        <SvgXml xml={svg.alert} />
      </AlertImage>
    </Container>
  );
}