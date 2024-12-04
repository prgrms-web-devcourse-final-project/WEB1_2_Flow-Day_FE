import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const PostCreateTitle = () => {
  return <PostCreateTitleDesign></PostCreateTitleDesign>;
};

export default PostCreateTitle;

const PostCreateTitleDesign = styled.TextInput`
  width: 370px;
  height: 40px;
  margin: 10px auto;
  border: 1px solid #eeeeee;
`;
