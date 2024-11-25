import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';

// styled-components로 스타일링된 컴포넌트 정의
const HeaderDesign = styled.View`
  background-color: white;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const NotificationButton = styled.TouchableOpacity`
  padding: 5px;
`;

const Header = () => {
  return (
    <HeaderDesign>
    <Text>Flow Day</Text>
        <Text>D+100</Text>
        <NotificationButton>
          <Text>🔔</Text>
        </NotificationButton>
    </HeaderDesign>
  )
}

export default Header