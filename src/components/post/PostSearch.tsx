import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

const InputText = styled.TextInput`
  width: 330px;
  height: 45px;
  margin: 10px;
  margin-right: auto;
  border: 1px solid #dddddd;
  border-radius: 6px;
`;

const PostSearch = () => {
  const [input, setInput] = useState('');
  return (
    <InputText
      onChangeText={text => setInput(text)}
      placeholder="제목, 태그를 입력해주세요"
      value={input}
    />
  );
};

export default PostSearch;
