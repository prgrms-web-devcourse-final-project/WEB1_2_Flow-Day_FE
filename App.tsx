import { Button, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import HomePage from '@/pages/home-page/HomePage';
import ChatPage from '@/pages/chat-page/ChatPage';


import Header from './src/components/Header';
import { svg } from '@/assets/icons/svg';

const COLORS = {
  active: '#FF6666',
  inactive: '#000000',
};

const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ButtonText = styled.Text`
  font-size: 13px;
  margin-top: 2px;
  text-align: center;;
  min-width: 36px;
  height: 20px;
`

const App = () => {
  const Tab = createBottomTabNavigator();

  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

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
            paddingBottom: 30
          },
          tabBarShowLabel: true,
          tabBarLabelPosition:'below-icon'
        }}>

        <Tab.Screen 
          name='home' 
          component={HomePage}
          options={{
            header: () => <Header>D+134</Header>,
            tabBarIcon: ({ focused } : {focused: boolean}) => {
              return (
                <ButtonBox>
                  <SvgXml xml={getModifiedSvg(svg.home, focused ? COLORS.active : COLORS.inactive)} />
                  <ButtonText style={{ color: focused ? COLORS.active : COLORS.inactive }}>
                    홈
                  </ButtonText>
                </ButtonBox>
              )
            }
          }}
        />
           
        <Tab.Screen 
          name='chat' 
          component={ChatPage}
          options={{ 
            header: () => <Header>D+1234</Header>, 
            tabBarIcon: ({ focused } : {focused: boolean}) => {
              return (
                <ButtonBox>
                  <SvgXml xml={getModifiedSvg(svg.chat, focused ? COLORS.active : COLORS.inactive)} />
                  <ButtonText style={{ color: focused ? COLORS.active : COLORS.inactive }}>
                    채팅
                  </ButtonText>
                </ButtonBox>
              )
            }
          }} 
        />

        <Tab.Screen 
          name='map' 
          component={ChatPage}
          options={{ 
            headerShown: false,
            tabBarIcon: ({ focused } : {focused: boolean}) => {
              return (
                <ButtonBox>
                  <SvgXml xml={getModifiedSvg(svg.map, focused ? COLORS.active : COLORS.inactive)} />
                  <ButtonText style={{ color: focused ? COLORS.active : COLORS.inactive }}>
                    지도
                  </ButtonText>
                </ButtonBox>
              )
            }
          }} 
        />

        <Tab.Screen
          name='post' 
          component={ChatPage}
          options={{ 
            header: () => <Header>게시글</Header>, 
            tabBarIcon: ({ focused } : {focused: boolean}) => {
              return (
                <ButtonBox>
                  <SvgXml xml={getModifiedSvg(svg.post, focused ? COLORS.active : COLORS.inactive)} />
                  <ButtonText style={{ color: focused ? COLORS.active : COLORS.inactive }}>
                    게시글
                  </ButtonText>
                </ButtonBox>
              )
            }
          }} 
        />
        
        <Tab.Screen 
          name='my' 
          component={ChatPage}
          options={{ 
            header: () => <Header>마이페이지</Header>, 
            tabBarIcon: ({ focused } : {focused: boolean}) => {
              return (
                <ButtonBox>
                  <SvgXml xml={getModifiedSvg(svg.my, focused ? COLORS.active : COLORS.inactive)} />
                  <ButtonText style={{ color: focused ? COLORS.active : COLORS.inactive }}>
                    마이
                  </ButtonText>
                </ButtonBox>
              )
            }
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
