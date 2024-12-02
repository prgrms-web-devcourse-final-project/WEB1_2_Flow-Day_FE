import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import PostButton from './PostButton';

const PostInputComment = () => {
  const [text, setText] = useState('');
  const postComment = axios.post('{{url}}/api/v1/replies/1');
  return (
    <InputCommentDesign>
      <InputComment multiline={true}></InputComment>
      <ButtonDesign>
        <PostButton onPress={() => {}}>입력</PostButton>
      </ButtonDesign>
    </InputCommentDesign>
  );
};

export default PostInputComment;

const InputCommentDesign = styled.View`
  width: 370px;
  height: 60px;
  margin: 10px auto;
  border: 1px solid #ff6666;
  border-radius: 6px;
`;

const InputComment = styled.TextInput`
  width: 360px;
  height: 50px;
`;

const ButtonDesign = styled.View`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
