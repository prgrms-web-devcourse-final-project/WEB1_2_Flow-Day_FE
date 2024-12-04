import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

import PostTitle from '@/components/post/post-detail/PostTitle';
import PostTag from '@/components/post/post-detail/PostTag';
import PostInfo from '@/components/post/post-detail/PostInfo';
import SaveCourse from '@/components/post/post-detail/SaveCourse';
import PostMap from '@/components/post/post-detail/PostMap';
import PostContents from '@/components/post/post-detail/PostContents';
import PostLikeButton from '@/components/post/post-detail/PostLikeButton';
import PostCommentButton from '@/components/post/post-detail/PostCommentButton';
import PostButton from '@/components/post/post-detail/PostButton';
import PostInputComment from '@/components/post/post-detail/PostInputComment';
import PostParentComment from '@/components/post/post-detail/PostParentComment';
import PostChildComment from '@/components/post/post-detail/PostChildComment';

const PostDetailPage = () => {
  const [commentList, setCommentList] = useState([]);
  // const getReplies = async () => {
  //   try {
  //     const res = await axios.get('{{url}}/api/v1/replies/1');
  //     const data = await res.data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  /** 댓글 더미데이터 - API 완성 시 수정 예정 */
  const commentData = [
    {
      id: 2,
      content: '부모댓글100',
      memberName: 'member1',
      likeCount: 0,
      createdAt: '2024-11-28T11:39:34.997124',
      children: [
        {
          id: 3,
          content: '자식댓글100',
          memberName: 'member1',
          likeCount: 0,
          createdAt: '2024-11-28T11:41:24.093087',
          children: [],
        },
        {
          id: 4,
          content: '자식댓글100',
          memberName: 'member1',
          likeCount: 0,
          createdAt: '2024-11-28T11:43:01.349621',
          children: [],
        },
      ],
    },
    {
      id: 5,
      content: '부모댓글10',
      memberName: 'member1',
      likeCount: 0,
      createdAt: '2024-11-28T11:46:52.440241',
      children: [],
    },
    {
      id: 6,
      content: '부모댓글11',
      memberName: 'member1',
      likeCount: 0,
      createdAt: '2024-11-28T11:46:55.760757',
      children: [
        {
          id: 8,
          content: '자식댓글1',
          memberName: 'member1',
          likeCount: 0,
          createdAt: '2024-11-28T11:47:15.188453',
          children: [],
        },
      ],
    },
  ];

  return (
    <PostDetailPageDesign showsVerticalScrollIndicator={false}>
      <PostTitle />
      <PostTag />
      <InfoSelectCourseBox>
        <PostInfo />
        <SaveCourse />
      </InfoSelectCourseBox>
      <PostMap />
      <PostContents />
      <Boxs>
        <ButtonsBox>
          <PostLikeButton />
          <PostCommentButton />
        </ButtonsBox>
        <ButtonsBox>
          <PostButton>수정</PostButton>
          <PostButton>삭제</PostButton>
        </ButtonsBox>
      </Boxs>
      <PostInputComment></PostInputComment>
      <PostCommentList>
        {commentData.map((comment, i) => {
          return <PostParentComment />;
        })}
      </PostCommentList>
    </PostDetailPageDesign>
  );
};

export default PostDetailPage;

const PostDetailPageDesign = styled.ScrollView`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const InfoSelectCourseBox = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Boxs = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonsBox = styled.View`
  flex-direction: row;
  height: 20px;
`;

const PostCommentList = styled.View`
  width: 370px;
`;
