import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const DateDisplayDesign = styled.View`
  width: 150px;
  height: 25px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  background-color: #fff;
  margin: 15px auto;
`;

const DateDisPlayText = styled.Text`
  text-align: center;
  font-size: 14px;
`;

const DateDisplay = () => {
  return (
    <DateDisplayDesign>
      <DateDisPlayText>2024년 12월 13일</DateDisPlayText>
    </DateDisplayDesign>
  );
};

export default DateDisplay;
