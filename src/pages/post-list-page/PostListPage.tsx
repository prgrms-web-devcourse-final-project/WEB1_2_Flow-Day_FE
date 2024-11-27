import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/PostHeader';
import PostSearch from '@/components/post/PostSearch';
import PostCategoryButton from '@/components/post/PostCategoryButton';
import PostItem from '@/components/post/PostItem';
import PostCategoryModal from '@/components/post/PostCategoryModal';

const PostListPageDesign = styled.View`
  flex: 1;
`;

const PostSearchCategory = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PostSortButton = styled.TouchableOpacity`
  width: 60px;
  height: 25px;
  background-color: #fff;
  border: 1px solid #dddddd;
  border-radius: 6px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: auto;
  text-align: center;
  font-size: 10px;
  align-items: center;
  justify-content: center;
`;

const PostSortText = styled.Text`
  margin: auto;
  margin-bottom: auto;
`;

interface IPost {
  id: string;
  writerName: string; // 닉네임
  city: string; // 카테고리
  title: string; // 게시글 제목
  contents: string; // 게시글 내용
  courseId: number; // 코스 아이디
  // status: 'public' | 'couple' | 'private'; // 게시글 열람 유저
  created_at: string; // 생성일자
  updated_at: string; // 수정일자
  spots: [];
  images: [];
}

const PostListPage = () => {
  const [isLatest, setIsLatest] = useState(true);
  const [onCategoryModal, isOnCategoryModal] = useState(false);
  const [data, setData] = useState([
    {
      id: 2,
      writerName: '홍길동',
      city: '서울',
      title: '게시글 제목',
      contents: '게시글 내용',
      courseId: 1,
      createdAt: '2024-11-27T09:46:15.71829',
      updatedAt: '2024-11-27T09:46:15.71829',
      spots: null,
      images: null,
    },
    {
      id: 1,
      writerName: '홍길동',
      city: '서울',
      title: '게시글 제목',
      contents: '게시글 내용',
      courseId: null,
      createdAt: '2024-11-27T09:46:11.424663',
      updatedAt: '2024-11-27T09:46:11.424663',
      spots: null,
      images: null,
    },
  ]);
  // useEffect(() => {
  //   // 서버로부터
  //   const getPostItem = async () => {
  //     try {
  //       const res = await axios.get('http://url/추가해주세요');
  //       // 해야할 것 !! -> 데이터 추가해주기!!
  //     } catch (err) {
  //       console.error('포스트 리스트를 불러오는데 에러가 발생 : ', err);
  //     }
  //   };
  //   getPostItem();
  // }, []);

  return (
    <PostListPageDesign>
      <PostHeader />
      <PostSearchCategory>
        <PostSearch />
        <PostCategoryButton />
      </PostSearchCategory>
      <PostSortButton
        onPress={() => {
          setIsLatest(!isLatest);
        }}
      >
        {isLatest ? (
          <PostSortText>최신순</PostSortText>
        ) : (
          <PostSortText>인기순</PostSortText>
        )}
      </PostSortButton>
      <PostItem></PostItem>
      {onCategoryModal && <PostCategoryModal></PostCategoryModal>}
    </PostListPageDesign>
  );
};

export default PostListPage;

const styles = StyleSheet.create({});
