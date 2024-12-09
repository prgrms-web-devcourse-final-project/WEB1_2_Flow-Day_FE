import { svg } from '@/assets/icons/svg';
import { ROUTES } from '@/constants/routes';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';
import { navigationRef } from '../../App'
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type HeaderProps = {
  children: React.ReactNode;
}

const Container = styled.View`
  background-color: #FFFFFF;
  padding: 15px 14px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const HeaderText = styled.Text`
  position: absolute;
  width: ${width}px;
  margin: auto;
  font-family: 'SCDream5';
  font-size: 16px;
  text-align: center;
`

const LogoImage = styled.View`
  justify-content: center;
  align-items: center;
`

const AlertImage = styled.View`
  justify-content: center;
  align-items: center;
`

export default function Header({children}: HeaderProps) {
  
  return (
    <Container>
      <TouchableOpacity onPress={() => navigationRef.navigate(ROUTES.HOME as never)}>
        <LogoImage>
          <SvgXml xml={svg.logo} />
        </LogoImage>
      </TouchableOpacity>
      <HeaderText>{children}</HeaderText>
      <AlertImage>
        <SvgXml xml={svg.alert} />
      </AlertImage>
    </Container>
  );
}