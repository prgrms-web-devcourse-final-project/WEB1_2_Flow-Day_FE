import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import {useStore} from '@/store/useStore';
import PostHeader from '@/components/post/PostHeader';
import PostSearch from '@/components/post/PostSearch';
import PostCategoryButton from '@/components/post/PostCategoryButton';
import PostItem from '@/components/post/PostItem';
import PostCategoryModal from '@/components/post/PostCategoryModal';
import Buttons from '@/components/Buttons';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

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

interface PostListPageProps {
  type?: string | null;
  title?: string | null;
}

const PostListPage: React.FC<PostListPageProps> = ({ type, title }) => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: { type: string | null; title: string | null } }, 'params'>>();
  const [isLatest, setIsLatest] = useState(true);
  const [onCategoryModal, isOnCategoryModal] = useState(false);
  const [postData, setPostData] = useState<IPost[]>([]);
  const [page, setPage] = useState(0); // 현재 페이지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드
  const [selectedCategories, setSelectedCategories] = useState<{seasons: string[]; regions: string[]}>({seasons: [], regions: []});
  const {accessToken} = useStore();
  const [header, setHeader] = useState('');

  let { type: routeType, title: routeTitle } = route.params ||  {type: null, title: null};
  if(routeTitle === '내 포스트') {
    routeType = '';
    
  }
console.log(routeType);
console.log(routeTitle);

  useEffect(() => {
    if (routeTitle) {
      setHeader(routeTitle);
    } else {
      setHeader('게시글');
    }
  }, [routeTitle]);

  const getPostList = async (pageNumber: number, isLatest: boolean, keyword: string) => {
    if (!accessToken || isLoading) return; // 로딩 중이면 요청하지 않음
    setIsLoading(true); // 로딩 시작
    try {
      const categoryKeyword = [...selectedCategories.seasons, ...selectedCategories.regions].join(' ');
      const finalKeyword = keyword ? `${keyword} ${categoryKeyword}` : categoryKeyword;
      let url = '';

      if(!routeType && routeType !== '') {
        url = finalKeyword
        ? `http://flowday.kro.kr:80/api/v1/posts/all/list?kw=${finalKeyword}&pageSize=10&page=${pageNumber}`
        : isLatest
          ? `http://flowday.kro.kr:80/api/v1/posts/all/latest?pageSize=10&page=${pageNumber}`
          : `http://flowday.kro.kr:80/api/v1/posts/all/mostLike?pageSize=10&page=${pageNumber}`;
      } else {
        url = `http://flowday.kro.kr:80/api/v1/posts/all${routeType}`
      }
      console.log(url);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newPosts = res.data.content;
      if (!routeType && routeType !== '' && newPosts.length > 0) {
        setPostData((prevData) => (pageNumber === 0 ? newPosts : [...prevData, ...newPosts])); // 페이지가 0이면 기존 데이터 덮어쓰기
      } else {
        setPostData(res.data.content);
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
  }, [page, isLatest, searchKeyword, selectedCategories]);

  const renderItem = ({item}: {item: IPost}) => {
    return <PostItem postData={item} />;
  };

  // PostItem 클릭 시 호출되는 함수
  // const handlePostItemPress = (postId: string) => {
  //   navigation.navigate('PostDetailPage'); // 네비게이션에 postId 전달
  // };

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

  const handleCategoryComplete = (selectedCategories: {seasons: string[]; regions: string[]}) => {
    setSelectedCategories(selectedCategories);
    setPage(0); // 페이지 초기화 (새로운 데이터 요청)
  };

  console.log(title);

  return (
    <PostListPageDesign>
      <PostHeader>{header}</PostHeader>
      { !routeType && routeType !== '' && (
        <>
         <PostSearchCategory>
            <PostSearch onSearch={handleSearch} />
            <PostCategoryButton
              onPress={() => {
                isOnCategoryModal(true);
              }}
            />
          </PostSearchCategory>
          <PostSortButton onPress={handleSortButtonPress}>{isLatest ? <PostSortText>최신순</PostSortText> : <PostSortText>인기순</PostSortText>}</PostSortButton>
        </>
      )}
      {isLoading && postData.length === 0 && (!routeType || routeType !== '') ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={postData}
          renderItem={renderItem}
          keyExtractor={(item: IPost, index: number) => `${item.id}-${index}`} // id와 index를 결합하여 고유한 키 생성
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
        />
      )}
      {
        !routeType && routeType !== '' &&
        (<Buttons.LongBtn onPress={() => navigation.navigate('PostCreatePage')} text='글쓰기' style={{marginBottom: 10}} />)
      }
      {onCategoryModal && (
        <PostCategoryModal
          onPress={() => {
            isOnCategoryModal(false);
          }}
          onComplete={handleCategoryComplete}
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
