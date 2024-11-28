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

const PostList = styled.FlatList`
  background-color: #000000;
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
  const postData = {
    id: 1,
    nickName: '홍길동',
    region: '서울 경기',
    season: '봄 여름',
    title: '게시글 제목',
    contents: '게시글 내용',
    tags: '#홍대 #서울데이트',
    courseId: 1,
    createdAt: '2024-11-27T12:17:39.316713',
    updatedAt: '2024-11-27T12:17:39.316713',
    spots: [
      {
        id: 1,
        placeId: 'place1',
        name: '카페',
        city: '서울 종로',
        comment: '코멘트',
        sequence: 1,
        courseId: 1,
        voteId: null,
      },
      {
        id: 2,
        placeId: 'place2',
        name: '밥집',
        city: '서울 종로',
        comment: '코멘트',
        sequence: 1,
        courseId: 1,
        voteId: null,
      },
    ],
    images: [
      {
        id: 1,
        url: 'https://flowday.s3.ap-northeast-2.amazonaws.com/post/2024_11_27/08f43d5b-bbd4-46c2-9bb4-c838bca7eee9_Flow%20Day%20(1).png',
        originFileName: 'Flow Day (1).png',
        fileSize: 678295,
        fileExt: 'png',
      },
      {
        id: 2,
        url: 'https://flowday.s3.ap-northeast-2.amazonaws.com/post/2024_11_27/e484fba9-1b95-42c0-8aa8-2425a8adf8f7_스크린샷%202024-11-23%20오후%2012.06.45.png',
        originFileName: '스크린샷 2024-11-23 오후 12.06.45.png',
        fileSize: 52118,
        fileExt: 'png',
      },
    ],
  };

  return (
    <PostListPageDesign>
      <PostHeader />
      <PostSearchCategory>
        <PostSearch />
        <PostCategoryButton
          onPress={() => {
            isOnCategoryModal(true);
          }}
        />
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
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      <PostItem postData={postData}></PostItem>
      {onCategoryModal && (
        <PostCategoryModal
          onPress={() => {
            isOnCategoryModal(false);
          }}
        ></PostCategoryModal>
      )}
    </PostListPageDesign>
  );
};

export default PostListPage;

const styles = StyleSheet.create({});
