import { Button, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SvgXml } from 'react-native-svg';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import HomePage from '@/pages/home-page/HomePage';
import ChatPage from '@/pages/chat-page/ChatPage';
import MapPage from '@/pages/map-page/MapPage';
import { SearchPage } from '@/pages/map-page/SearchPage';
import Header from './src/components/Header';
import { svg } from '@/assets/icons/svg';
import PostListPage from '@/pages/post-list-page/PostListPage';

// 색상 설정
const COLORS = {
  active: '#FF6666',
  inactive: '#000000',
};

const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonText = styled.Text`
  font-size: 13px;
  margin-top: 2px;
  text-align: center;
  min-width: 36px;
  height: 20px;
  font-family: 'SCDream4';
`;

const SafeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

// Stack Navigator 생성 - MapPage와 SearchPage의 네비게이션을 위한 스택
const Stack = createNativeStackNavigator();

// 지도 관련 화면들을 위한 Stack Navigator 컴포넌트
const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MapMain"
        component={MapPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// 게시글 관련 화면들을 위한 Stack Navigator 컴포넌트
const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostListPage"
        component={PostListPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const Tab = createBottomTabNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 앱 시작시 폰트 로드
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          SCDream1: require('./src/assets/font/SCDream1.otf'),
          SCDream2: require('./src/assets/font/SCDream2.otf'),
          SCDream3: require('./src/assets/font/SCDream3.otf'),
          SCDream4: require('./src/assets/font/SCDream4.otf'),
          SCDream5: require('./src/assets/font/SCDream5.otf'),
          SCDream6: require('./src/assets/font/SCDream6.otf'),
          SCDream7: require('./src/assets/font/SCDream7.otf'),
          SCDream8: require('./src/assets/font/SCDream8.otf'),
          SCDream9: require('./src/assets/font/SCDream9.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  // 폰트 로딩 전에는 아무것도 렌더링하지 않음
  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 56,
            borderTopWidth: 1,
            borderTopColor: '#EEEEEE',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 30,
          },
          tabBarShowLabel: true,
          tabBarLabelPosition: 'below-icon',
        }}
      >
        <Tab.Screen
          name="home"
          component={HomePage}
          options={{
            header: () => <Header>D+134</Header>,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <ButtonBox>
                  <SvgXml
                    xml={getModifiedSvg(
                      svg.home,
                      focused ? COLORS.active : COLORS.inactive,
                    )}
                  />
                  <ButtonText
                    style={{ color: focused ? COLORS.active : COLORS.inactive }}
                  >
                    홈
                  </ButtonText>
                </ButtonBox>
              );
            },
          }}
        />

        <Tab.Screen
          name="chat"
          component={ChatPage}
          options={{
            header: () => <Header>D+1234</Header>,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <ButtonBox>
                  <SvgXml
                    xml={getModifiedSvg(
                      svg.chat,
                      focused ? COLORS.active : COLORS.inactive,
                    )}
                  />
                  <ButtonText
                    style={{ color: focused ? COLORS.active : COLORS.inactive }}
                  >
                    채팅
                  </ButtonText>
                </ButtonBox>
              );
            },
          }}
        />

        <Tab.Screen
          name="map"
          component={MapStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <ButtonBox>
                  <SvgXml
                    xml={getModifiedSvg(
                      svg.map,
                      focused ? COLORS.active : COLORS.inactive,
                    )}
                  />
                  <ButtonText
                    style={{ color: focused ? COLORS.active : COLORS.inactive }}
                  >
                    지도
                  </ButtonText>
                </ButtonBox>
              );
            },
          }}
        />

        <Tab.Screen
          name="posts"
          component={PostStack} // PostStack을 사용하도록 변경
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <ButtonBox>
                  <SvgXml
                    xml={getModifiedSvg(
                      svg.post,
                      focused ? COLORS.active : COLORS.inactive,
                    )}
                  />
                  <ButtonText
                    style={{ color: focused ? COLORS.active : COLORS.inactive }}
                  >
                    게시글
                  </ButtonText>
                </ButtonBox>
              );
            },
          }}
        />

        <Tab.Screen
          name="my"
          component={ChatPage}
          options={{
            header: () => <Header>마이페이지</Header>,
            tabBarIcon: ({ focused }: { focused: boolean }) => {
              return (
                <ButtonBox>
                  <SvgXml
                    xml={getModifiedSvg(
                      svg.my,
                      focused ? COLORS.active : COLORS.inactive,
                    )}
                  />
                  <ButtonText
                    style={{ color: focused ? COLORS.active : COLORS.inactive }}
                  >
                    마이
                  </ButtonText>
                </ButtonBox>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
