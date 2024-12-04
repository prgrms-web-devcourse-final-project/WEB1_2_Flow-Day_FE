import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/PostHeader';
import PostSearch from '@/components/post/PostSearch';
import PostCategoryButton from '@/components/post/PostCategoryButton';
import PostItem from '@/components/post/PostItem';
import PostCategoryModal from '@/components/post/PostCategoryModal';
import axios from 'axios';

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
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const getPostList = async () => {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImxvZ2luSWQiOiJ0ZXN0MTIzNCIsImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjV9LCJpYXQiOjE3MzMxOTIzMTQsImV4cCI6MTczMzIyODMxNH0.gy5VDE4yTX7yel7mpzZaE-XCDJOdBSR0-5TOsYOwIaU';
        const res = await axios.get(
          'http://flowday.kro.kr:5000/api/v1/posts/all/latest?pageSize=10&page=0',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const postData = await res.data.content;
        setPostData(postData);
        console.log(postData);
      } catch (err) {
        console.error('getPostList 실패 : ', err);
      }
    };
    getPostList();
  }, []);

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
        keyExtractor={(item: any) => item.id.toString()}
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
  background-color: #fff;
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
