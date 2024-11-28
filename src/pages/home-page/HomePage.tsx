import { svg } from '@/assets/icons/svg';
import TopSwiper from '@/components/home/TopSwiper';
import { View, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';



const HomePage = () => {
  
  
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <TopSwiper />
    </View>
  );
};

export default HomePage;
