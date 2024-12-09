import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const AlertItemText = ({message}: any) => {
  return (
    <AlertItemTextDesign>
      <TextDesign ellipsizeMode='tail'>{message}</TextDesign>
    </AlertItemTextDesign>
  );
};

export default AlertItemText;

const AlertItemTextDesign = styled.View`
  height: 20px;
  justify-content: center;
  margin: auto 0px;
  width: 240px;
`;

const TextDesign = styled.Text`
  font-size: 14px;
  font-family: 'SCDream4';
  width: 240px; // 텍스트가 넘치지 않도록 고정 폭을 설정
`;
