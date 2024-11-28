import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

import Header from './src/components/Header';
import BottomBar from './src/components/BottomBar';

import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


const Content = styled.View`
 flex: 1;
 justify-content: 'center';
 align-items: 'center';
`;

const App = () => {
 const [fontsLoaded, setFontsLoaded] = useState(false);

 useEffect(() => {
   async function loadFonts() {
     try {
       await Font.loadAsync({
         'SCDream1': require('./src/assets/font/SCDream1.otf'),
         'SCDream2': require('./src/assets/font/SCDream2.otf'),
         'SCDream3': require('./src/assets/font/SCDream3.otf'),
         'SCDream4': require('./src/assets/font/SCDream4.otf'),
         'SCDream5': require('./src/assets/font/SCDream5.otf'),
         'SCDream6': require('./src/assets/font/SCDream6.otf'),
         'SCDream7': require('./src/assets/font/SCDream7.otf'),
         'SCDream8': require('./src/assets/font/SCDream8.otf'),
         'SCDream9': require('./src/assets/font/SCDream9.otf'),
       });
       setFontsLoaded(true);
     } catch (error) {
       console.error('Error loading fonts:', error);
     }
   }

   loadFonts();
 }, []);

 if (!fontsLoaded) {
   return null; // 또는 로딩 화면
 }

 return (
   <NavigationContainer>
     <View style={{ flex: 1 }}>
       <Content>

       </Content>

       <BottomBar />
     </View>
   </NavigationContainer>
 );
};

export default App;