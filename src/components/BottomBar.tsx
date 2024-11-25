import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const BottomBarDesign = styled.View`
  flex-direction: row;
  background-color: #333;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const BottomBarButtonWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BottomBarButton = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const BottomBarText = styled.Text`
  color: white;
  font-size: 16px;
`;

const BottomBar = () => {
  return (
    <BottomBarDesign>
      <BottomBarButtonWrapper>
        <BottomBarButton>
          <BottomBarText>홈</BottomBarText>
        </BottomBarButton>
      </BottomBarButtonWrapper>

      <BottomBarButtonWrapper>
        <BottomBarButton>
          <BottomBarText>채팅</BottomBarText>
        </BottomBarButton>
      </BottomBarButtonWrapper>

      <BottomBarButtonWrapper>
        <BottomBarButton>
          <BottomBarText>지도</BottomBarText>
        </BottomBarButton>
      </BottomBarButtonWrapper>

      <BottomBarButtonWrapper>
        <BottomBarButton>
          <BottomBarText>게시글</BottomBarText>
        </BottomBarButton>
      </BottomBarButtonWrapper>

      <BottomBarButtonWrapper>
        <BottomBarButton>
          <BottomBarText>마이</BottomBarText>
        </BottomBarButton>
      </BottomBarButtonWrapper>
    </BottomBarDesign>
  );
};

export default BottomBar;
