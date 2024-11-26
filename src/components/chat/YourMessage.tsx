import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

interface YourMessageProps {
  message: string;
}

const YourMessageDesign = styled.View`
  border: 1px solid #ffeadd;
  border-radius: 6px;
  background-color: #ffeadd;
  margin-top: 10px;
  margin-right: auto;
  margin-left: 5px;
  justify-content: center;
`;

const YourMessageText = styled.Text`
  max-width: 220px;
  max-height: 300px;
  min-height: 30px;
  font-size: 14px;
  justify-content: center;
  padding: 10px;
  color: #000000;
`;

const YourMessage: React.FC<YourMessageProps> = ({ message }) => {
  return (
    <YourMessageDesign>
      <YourMessageText>{message}</YourMessageText>
    </YourMessageDesign>
  );
};

export default YourMessage;
