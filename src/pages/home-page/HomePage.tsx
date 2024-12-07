import { View } from 'react-native';

import TopSwiper from '@/components/home/TopSwiper';
import MainContent from '@/components/home/MainContent';

const HomePage = () => {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <TopSwiper />
      <MainContent />
    </View>
  );
};

export default HomePage;
