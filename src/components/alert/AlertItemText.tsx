import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const AlertItemText = ({message}: any) => {
  return (
    <AlertItemTextDesign>
      <TextDesign>{message}</TextDesign>
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
  width: 240px;
`;
