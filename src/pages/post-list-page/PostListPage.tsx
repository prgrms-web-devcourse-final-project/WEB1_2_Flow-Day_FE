import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/PostHeader';
import PostSearch from '@/components/post/PostSearch';
import PostCategoryButton from '@/components/post/PostCategoryButton';
import PostItem from '@/components/post/PostItem';
import PostCategoryModal from '@/components/post/PostCategoryModal';
import axios from 'axios';
import {useStore} from '@/store/useStore';

interface IPost {
  id: string;
  writerName: string;
  city: string;
  title: string;
  contents: string;
  courseId: number;
  created_at: string;
  updated_at: string;
  spots: [];
  images?: [];
}

const PostListPage = () => {
  const [isLatest, setIsLatest] = useState(true); // true: 최신순, false: 인기순
  const [onCategoryModal, isOnCategoryModal] = useState(false);
  const [postData, setPostData] = useState<IPost[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드
  const {accessToken} = useStore();

  const getPostList = async (pageNumber: number, isLatest: boolean, keyword: string) => {
    if (!accessToken || isLoading) return; // 로딩 중이면 요청하지 않음

    setIsLoading(true); // 로딩 시작
    try {
      const url = keyword
        ? `http://flowday.kro.kr:80/api/v1/posts/all/list?kw=${keyword}&pageSize=10&page=${pageNumber}`
        : isLatest
          ? `http://flowday.kro.kr:80/api/v1/posts/all/latest?pageSize=10&page=${pageNumber}`
          : `http://flowday.kro.kr:80/api/v1/posts/all/mostLike?pageSize=10&page=${pageNumber}`;

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newPosts = res.data.content;
      console.log(newPosts);
      if (newPosts.length > 0) {
        setPostData((prevData) => (pageNumber === 0 ? newPosts : [...prevData, ...newPosts])); // 페이지가 0이면 기존 데이터 덮어쓰기
      }
    } catch (err) {
      console.error('getPostList 실패 : ', err);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  // 페이지가 바뀔 때마다 호출
  useEffect(() => {
    getPostList(page, isLatest, searchKeyword);
  }, [page, isLatest, searchKeyword]);

  // FlatList의 아이템 렌더링
  const renderItem = ({item}: {item: IPost}) => {
    return <PostItem postData={item} />;
  };

  // 스크롤 끝에 도달했을 때 호출
  const handleEndReached = () => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  // 버튼 클릭 시 최신순과 인기순 전환
  const handleSortButtonPress = () => {
    setIsLatest((prev) => !prev);
    setPage(0); // 페이지 초기화 (새로운 데이터 요청)
  };

  const handleSearch = async (keyword: string) => {
    setSearchKeyword(keyword); // 검색된 키워드로 상태 업데이트
    setPage(0); // 페이지 초기화 (새로운 검색 결과 요청)
    await getPostList(0, isLatest, keyword); // 검색 결과 요청
  };

  return (
    <PostListPageDesign>
      <PostHeader />
      <PostSearchCategory>
        <PostSearch onSearch={handleSearch} />
        <PostCategoryButton
          onPress={() => {
            isOnCategoryModal(true);
          }}
        />
      </PostSearchCategory>
      <PostSortButton onPress={handleSortButtonPress}>{isLatest ? <PostSortText>최신순</PostSortText> : <PostSortText>인기순</PostSortText>}</PostSortButton>
      <FlatList
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item: IPost) => item.id.toString()}
        onEndReached={handleEndReached} // 끝에 도달했을 때 호출
        onEndReachedThreshold={0.5} // 리스트의 50% 지점에서 호출
        ListFooterComponent={isLoading ? <LoadingIndicator /> : null} // 로딩 표시
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

// 로딩 인디케이터 (로딩 중일 때 표시)
const LoadingIndicator = () => (
  <View style={{padding: 10, alignItems: 'center'}}>
    <Text>Loading...</Text>
  </View>
);

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
