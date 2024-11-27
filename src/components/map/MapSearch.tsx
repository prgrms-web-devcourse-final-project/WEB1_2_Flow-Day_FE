// MapSearch.tsx
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/types/type';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';

const SearchContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 1;
`;

const SearchBar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 12px 16px;
  border-radius: 8px;
  shadowColor: #000000;
  shadowOffset: 0px 2px;
  shadowOpacity: 0.25;
  shadowRadius: 3.84px;
  elevation: 5;
`;

const SearchText = styled.Text`
  flex: 1;
  margin-left: 8px;
  font-size: 16px;
  color: #666;
`;

export const MapSearch = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SearchContainer>
      <SearchBar onPress={() => navigation.navigate('Search')}>
        <SvgXml xml={svg.search} width={20} height={20} />
        <SearchText>장소를 검색해보세요</SearchText>
      </SearchBar>
    </SearchContainer>
  );
};