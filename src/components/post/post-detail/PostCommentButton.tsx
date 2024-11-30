import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostDetailStore from '@/store/post/post-detail-store';
import styled from 'styled-components/native';

const PostCommentButton = () => {
  const {postDetailData} = usePostDetailStore();
  return (
    <PostCommentButtonDesign>
      <CommentIcon source={require('../../../assets/icons/comment.png')} />
      <CommentCount>{postDetailData.commentCount}</CommentCount>
    </PostCommentButtonDesign>
  );
};

export default PostCommentButton;

const PostCommentButtonDesign = styled.View`
  margin-right: 20px;
  height: 20px;
  flex-direction: row;
`;

const CommentIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: auto 0px;
  margin-right: 5px;
`;

const CommentCount = styled.Text`
  font-size: 12px;
  font-family: 'SCDream5';
  margin: auto 0px;
`;
