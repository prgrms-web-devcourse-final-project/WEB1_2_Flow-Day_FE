import {View} from 'react-native';

import react, {useEffect} from 'react';
import axios from 'axios';

import TopSwiper from '@/components/home/TopSwiper';
import MainContent from '@/components/home/MainContent';
import {useStore} from '@/store/useStore';

const HomePage = () => {
  const {accessToken, roomId, setRommId} = useStore();

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <TopSwiper />
      <MainContent />
    </View>
  );
};

export default HomePage;
