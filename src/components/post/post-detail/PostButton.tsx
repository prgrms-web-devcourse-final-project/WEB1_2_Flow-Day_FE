import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const PostButton = ({ children }, onPress: any) => {
  return (
    <PostButtonDesign onPress={onPress}>
      <ButtonText>{children}</ButtonText>
    </PostButtonDesign>
  );
};

export default PostButton;

const PostButtonDesign = styled.TouchableOpacity`
  width: 50px;
  height: 20px;
  background-color: #ff6666;
  border-radius: 6px;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  margin: auto;
  font-size: 12px;
  font-family: 'SCDream5';
  text-align: center;
  color: #ffffff;
`;
