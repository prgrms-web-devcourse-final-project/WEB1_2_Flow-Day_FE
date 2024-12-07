import { Text, View } from 'react-native'; // react-native
import styled from 'styled-components/native'; // native용 styled-components
import { NavigationContainer } from '@react-navigation/native'; // 내비게이션 라이브러리

import Header from './src/components/Header'; // 상단 헤더 가져오기
import BottomBar from './src/components/BottomBar'; // 하단 바 가져오기
import ChatPage from '@/pages/chat-page/ChatPage';

const Content = styled.View`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
`;

const App = () => {
  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header></Header>
        <Content>
          <ChatPage></ChatPage>
        </Content>
        <BottomBar />
      </View>
    </NavigationContainer>
  );
};

export default App;
