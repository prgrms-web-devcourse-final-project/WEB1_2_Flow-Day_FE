import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostDetailStore from '@/store/post/post-detail-store';
import styled from 'styled-components/native';

const PostTitle = () => {
  const {postDetailData, updatePostDetailData} = usePostDetailStore();
  return (
    <PostTitleDesign>
      <TitleText>{postDetailData.title}</TitleText>
    </PostTitleDesign>
  );
};

export default PostTitle;

const PostTitleDesign = styled.View`
  width: 370px;
  height: 40px;
  margin: 10px auto;
  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

const TitleText = styled.Text`
  font-family: SCDream5;
  font-size: 20px;
  width: 360px;
  height: 30px;
  margin: 0 auto;
`;
