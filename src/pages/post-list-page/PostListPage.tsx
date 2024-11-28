import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/PostHeader';
import PostSearch from '@/components/post/PostSearch';
import PostCategoryButton from '@/components/post/PostCategoryButton';
import PostItem from '@/components/post/PostItem';
import PostCategoryModal from '@/components/post/PostCategoryModal';

/** API 완성 시 변경 예정 (게시글 페이지에서만 사용하는 인터페이스) */
interface IPost {
  id: string;
  writerName: string; // 닉네임
  city: string; // 카테고리
  title: string; // 게시글 제목
  contents: string; // 게시글 내용
  courseId: number; // 코스 아이디
  created_at: string; // 생성일자
  updated_at: string; // 수정일자
  spots: [];
  images?: [];
}

const PostListPage = () => {
  const [isLatest, setIsLatest] = useState(true);
  const [onCategoryModal, isOnCategoryModal] = useState(false);

  /** 테스트 코드 : 게시글 리스트 API 완성 시 수정 예정 */
  const postData = [
    {
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
    },
    {
      id: 2,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 3,
      nickName: '홍길동',
      region: '서울 경기',
      season: '봄 여름',
      title: '게시글 제목',
      contents: '게시글 내용',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 4,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 5,
      nickName: '홍길동',
      region: '서울 경기',
      season: '봄 여름',
      title: '게시글 제목',
      contents: '게시글 내용',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 6,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 7,
      nickName: '홍길동',
      region: '서울 경기',
      season: '봄 여름',
      title: '게시글 제목',
      contents: '게시글 내용',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 8,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 9,
      nickName: '홍길동',
      region: '서울 경기',
      season: '봄 여름',
      title: '게시글 제목',
      contents: '게시글 내용',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 10,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 11,
      nickName: '홍길동',
      region: '서울 경기',
      season: '봄 여름',
      title: '게시글 제목',
      contents: '게시글 내용',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
    {
      id: 12,
      nickName: '하하하',
      region: '대구 경북',
      season: '가을 겨울',
      title: '게시글 제목입니다아아아아아',
      contents: '게시글 내용ㅇ니데요오오오옹',
      tags: '#홍대 #서울데이트',
      courseId: 1,
      createdAt: '2024-11-27T12:17:39.316713',
      updatedAt: '2024-11-27T12:17:39.316713',
    },
  ];

  // item의 타입은 추후 API가 완성되면 수정하겠습니다.
  const renderItem = ({ item }: any) => {
    return <PostItem postData={item} />;
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
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      {onCategoryModal && (
        <PostCategoryModal
          onPress={() => {
            isOnCategoryModal(false);
          }}
        />
      )}
    </PostListPageDesign>
  );
};

export default PostListPage;

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
