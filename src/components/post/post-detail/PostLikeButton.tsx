import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';

const PostLikeButton = () => {
  const {postDetailData} = usePostDetailStore();
  return (
    <PostLikeButtonDesign>
      <LikeIcon source={require('../../../assets/icons/like.png')} />
      <LikeCount>{postDetailData.likeCount}</LikeCount>
    </PostLikeButtonDesign>
  );
};

export default PostLikeButton;

const PostLikeButtonDesign = styled.View`
  margin-right: 20px;
  height: 20px;
  flex-direction: row;
`;

const LikeIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: auto 0px;
  margin-right: 5px;
`;

const LikeCount = styled.Text`
  font-size: 12px;
  font-family: 'SCDream5';
  margin: auto 0px;
`;
