import { View, TextInput } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const ChatInputText = () => {
  const [inputText, setInputText] = useState('');

  return (
    <ChatInputTextDesign
      placeholder="텍스트를 입력해주세요"
      onChangeText={text => setInputText(text)}
      value={inputText}
    />
  );
};

export default ChatInputText;

const ChatInputTextDesign = styled.TextInput`
  width: 370px;
  height: 50px;
  border: 1px solid #ff6666;
  border-radius: 6px;
  padding: 10px;
  margin: 10px auto;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;
