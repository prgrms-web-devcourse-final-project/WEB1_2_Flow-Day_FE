import {Button, SafeAreaView, Text, View} from 'react-native';
import styled from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SvgXml} from 'react-native-svg';
import {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';

import HomePage from '@/pages/home-page/HomePage';
import ChatPage from '@/pages/chat-page/ChatPage';
import Header from './src/components/Header';
import { svg } from '@/assets/icons/svg';
import { ROUTES } from '@/constants/routes';
import MapPage from '@/pages/map-page/MapPage';
import {SearchPage} from '@/pages/map-page/SearchPage';
import * as Font from 'expo-font';

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
  text-align: center;;
  min-width: 38px;
  height: 20px;
  font-family: 'SCDream4';
`;

const Stack = createNativeStackNavigator();

const MapStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ROUTES.MAP} component={MapPage} options={{headerShown: false}} />
      <Stack.Screen name='Search' component={SearchPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const App = () => {
  const Tab = createBottomTabNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
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
            tabBarLabelPosition:'below-icon'
          }}>
          
          <Tab.Screen 
            name={ROUTES.HOME}
            component={HomePage}
            options={{
              header: () => <Header>D+134</Header>,
              tabBarIcon: ({focused}: {focused: boolean}) => {
                return (
                  <ButtonBox>
                    <SvgXml xml={getModifiedSvg(svg.home, focused ? COLORS.active : COLORS.inactive)} />
                    <ButtonText style={{color: focused ? COLORS.active : COLORS.inactive}}>홈</ButtonText>
                  </ButtonBox>
                );
              },
            }}
          />

          <Tab.Screen 
            name={ROUTES.CHAT} 
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
            name={ROUTES.MAP} 
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
            name={ROUTES.POST}
            component={ChatPage}
            options={{
              header: () => <Header>게시글</Header>,
              tabBarIcon: ({focused}: {focused: boolean}) => {
                return (
                  <ButtonBox>
                    <SvgXml xml={getModifiedSvg(svg.post, focused ? COLORS.active : COLORS.inactive)} />
                    <ButtonText style={{color: focused ? COLORS.active : COLORS.inactive}}>게시글</ButtonText>
                  </ButtonBox>
                );
              },
            }}
          />

          <Tab.Screen 
            name={ROUTES.MY}
            component={ChatPage}
            options={{
              header: () => <Header>마이페이지</Header>,
              tabBarIcon: ({focused}: {focused: boolean}) => {
                return (
                  <ButtonBox>
                    <SvgXml xml={getModifiedSvg(svg.my, focused ? COLORS.active : COLORS.inactive)} />
                    <ButtonText style={{color: focused ? COLORS.active : COLORS.inactive}}>마이</ButtonText>
                  </ButtonBox>
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
};

export default App;
