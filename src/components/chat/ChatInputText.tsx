import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const ChatInputTextDesign = styled.TextInput`
  width: 100%;
  height: 200px;
  border: 1px solid #ff6666;
  position: absolute;
  top: 250px;
`;

const ChatInputText = () => {
  return <ChatInputTextDesign></ChatInputTextDesign>;
};

export default ChatInputText;
