import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';

const PostContents = () => {
  const {postDetailData} = usePostDetailStore();
  return (
    <PostContentsDesign>
      <ContentsText>{postDetailData.contents}</ContentsText>
    </PostContentsDesign>
  );
};

export default PostContents;

const PostContentsDesign = styled.View`
  width: 370px;
  min-height: 100px;
  margin: 20px 0px;
`;

const ContentsText = styled.Text`
  font-size: 12px;
  font-family: 'SCDream3';
  padding: 20px 0px;
`;
