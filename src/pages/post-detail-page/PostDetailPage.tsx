import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '@/store/useStore';
import usePostDetailStore from '@/store/post/post-detail-store';

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
import PostDetailImages from '@/components/post/post-detail/PostDetailImages';

const PostDetailPage = ({ route }) => {
  const { accessToken } = useStore();
  const { postId } = route.params;
  const { postDetailData, replyData, updatePostDetailData, setReplyData } =
    usePostDetailStore();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await axios.get(
          `http://flowday.kro.kr:80/api/v1/posts/${postId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const newData = res.data;
        updatePostDetailData(newData);
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태 업데이트
      } catch (error) {
        console.error('Error fetching post detail:', error);
        setLoading(false); // 에러가 나도 로딩 상태 종료
      }
    };
    fetchPostDetail();
  }, [postId]);

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://flowday.kro.kr:80/api/v1/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      // 삭제 후, 홈 페이지로 이동하거나 다른 처리를 합니다.
      // 예: navigation.goBack(); 또는 navigation.navigate('Home');
      // navigation.goBack(); // 예시로 이전 페이지로 돌아가기
      navigation.navigate('PostListPage');
    } catch (err) {
      console.error('게시글 삭제 에러:', err);
    }
  };

  useEffect(() => {
    const getReply = async () => {
      try {
        const res = await axios.get(
          `http://flowday.kro.kr:80/api/v1/replies/${postId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
        const data = await res.data;
        setReplyData(data);
      } catch (err) {
        console.error('게시글 조회 에러:', err);
      }
    };
    getReply();
  }, []);

  const onPressEdit = () => {
    navigation.navigate('PostEditPage', {postId});
  };

  if (loading) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <PostDetailPageDesign showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ margin: 20 }} />
      <PostTitle />
      {postDetailData.tags && <PostTag />}
      <InfoSelectCourseBox>
        <PostInfo />
        <SaveCourse />
      </InfoSelectCourseBox>
      <PostMap />
      {postDetailData.images && <PostDetailImages />}
      <PostContents />
      <Boxs>
        <ButtonsBox>
          <PostLikeButton />
          <PostCommentButton />
        </ButtonsBox>
        <ButtonsBox>
          <PostButton onPress={onPressEdit}>수정</PostButton>
          <PostButton onPress={deletePost}>삭제</PostButton>
        </ButtonsBox>
      </Boxs>
      <PostInputComment postId={postId} />
      <PostCommentList>
        {replyData.length > 0 &&
          replyData.map((comment, i) => (
            <PostParentComment comment={comment} key={i} />
          ))}
      </PostCommentList>
      <SafeAreaView />
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
