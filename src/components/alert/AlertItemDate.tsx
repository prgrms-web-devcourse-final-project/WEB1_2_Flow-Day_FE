import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const AlertItemDate = ({createdAt}: any) => {
  const [date, time] = createdAt.split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');
  return (
    <AlertItemDateDesign>
      <TextDesign>{`${year}/${month}/${day}`}</TextDesign>
    </AlertItemDateDesign>
  );
};

export default AlertItemDate;

const AlertItemDateDesign = styled.View`
  height: 20px;
  justify-content: center;
  margin: auto 10px;
  margin-left: auto;
`;

const TextDesign = styled.Text`
  font-size: 12px;
  font-family: 'SCDream4';
`;
