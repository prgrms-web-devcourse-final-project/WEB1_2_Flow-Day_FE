import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

import PostTitle from '@/components/post/post-detail/PostTitle';
import PostTag from '@/components/post/post-detail/PostTag';
import PostInfo from '@/components/post/post-detail/PostInfo';
import SelectCourse from '@/components/post/post-detail/SelectCourse';
import PostMap from '@/components/post/post-detail/PostMap';
import PostContents from '@/components/post/post-detail/PostContents';
import PostLikeButton from '@/components/post/post-detail/PostLikeButton';
import PostCommentButton from '@/components/post/post-detail/PostCommentButton';
import PostButton from '@/components/post/post-detail/PostButton';
import PostInputComment from '@/components/post/post-detail/PostInputComment';
import PostComment from '@/components/post/post-detail/PostComment';

const PostDetailPage = () => {
  return (
    <PostDetailPageDesign>
      <PostTitle></PostTitle>
      <PostTag>태그</PostTag>
      <PostInfo>포스트 정보</PostInfo>
      <SelectCourse>코스 저장</SelectCourse>
      <PostMap></PostMap>
      <PostContents></PostContents>
      <PostLikeButton></PostLikeButton>
      <PostCommentButton></PostCommentButton>
      <PostButton>수정</PostButton>
      <PostButton>삭제</PostButton>
      <PostInputComment>
        <PostButton>입력</PostButton>
      </PostInputComment>
      <PostComment>댓글입니다</PostComment>
      <PostComment>댓글입니다</PostComment>
      <PostComment>댓글입니다</PostComment>
    </PostDetailPageDesign>
  );
};

export default PostDetailPage;

const PostDetailPageDesign = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;
