import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const PostHeaderDesign = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: center;
  height: 56px;
  border: 1px solid black;
`;

const PostHeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  width: 100px;
  text-align: center;
  margin: auto;
`;

const PostHeaderBackButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 16px;
`;

const PostHeaderBackImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const PostHeader = () => {
  return (
    <PostHeaderDesign>
      <PostHeaderBackButton>
        <PostHeaderBackImage source={require('../../assets/icons/back.png')} />
      </PostHeaderBackButton>
      <PostHeaderTitle>
        <Text>게시글</Text>
      </PostHeaderTitle>
    </PostHeaderDesign>
  );
};

export default PostHeader;
