import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  z-index: 100;
  flex-direction: row;
  background-color: #FFFFFF;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border: 1px solid #EEEEEE;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #000000;
  font-size: 16px;
  padding: 2px;
`;

const BottomBar = () => {
  return (
    <Container>
        <Button>
          <Image source={require('../assets/icons/home.svg')} />
          <ButtonText>홈</ButtonText>
        </Button>

        <Button>
          <Image source={require('../assets/icons/chat.svg')} />
          <ButtonText>채팅</ButtonText>
        </Button>

        <Button>
          <Image source={require('../assets/icons/map.svg')} />
          <ButtonText>지도</ButtonText>
        </Button>

        <Button>
          <Image source={require('../assets/icons/post.svg')} />
          <ButtonText>게시글</ButtonText>
        </Button>

        <Button>
          <Image source={require('../assets/icons/my.svg')} />
          <ButtonText>마이</ButtonText>
        </Button>
    </Container>
  );
};

export default BottomBar;
