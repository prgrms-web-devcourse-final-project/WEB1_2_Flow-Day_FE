import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { SearchResult } from '@/types/type';

const SearchPageContainer = styled.SafeAreaView`
 flex: 1;
 background-color: white;
`;

const TitleHeader = styled.View`
 flex-direction: row;
 align-items: center;
 padding: 16px;
 border-bottom-width: 1px;
 border-bottom-color: #EEEEEE;
 margin-bottom: 9px;
`;

const TitleText = styled.Text`
 font-size: 16px;
 font-family: 'SCDream4';
 margin: 0 auto;
`;

const SearchBarContainer = styled.View`
 padding: 0 16px 16px 16px;
`;

const SearchPageBar = styled.View`
 flex-direction: row;
 align-items: center;
 background-color: white;
 padding: 0px 16px;
 border-radius: 8px;
 border-width: 1px;
 border-color: #7D7D7D;
`;

const SearchInput = styled.TextInput`
 flex: 1;
 margin-left: 8px;
 font-size: 16px;
 font-family: 'SCDream4';
`;

const RecentSearchContainer = styled.ScrollView`
 flex: 1;
`;

const RecentSearchContent = styled.View`
 padding: 16px;
`;

const RecentSearchHeader = styled.View`
 flex-direction: row;
 justify-content: space-between;
 margin-bottom: 16px;
`;

const HeaderText = styled.Text`
 font-size: 16px;
 font-weight: 500;
`;

const ClearAllButton = styled.TouchableOpacity``;

const ClearAllText = styled.Text`
 color: #7D7D7D;
`;

const RecentSearchItem = styled.TouchableOpacity`
 flex-direction: row;
 align-items: center;
 padding: 12px 0;
`;

const SearchResultItem = styled.TouchableOpacity`
 flex-direction: row;
 align-items: center;
 padding: 16px;
`;

const ItemText = styled.Text`
 flex: 1;
 margin-left: 12px;
 font-size: 15px;
 font-family: 'SCDream4';
`;

const NoResultContainer = styled.View`
 flex: 1;
 justify-content: center;
 align-items: center;
 margin-bottom: 100px;
`;

const NoResultText = styled.Text`
 color: #ff6666;
 margin-top: 12px;
 text-align: center;
 line-height: 22px;
 font-family: 'SCDream4';
`;

export const SearchPage = () => {
 const navigation = useNavigation();
 const [searchText, setSearchText] = useState('');
 const [recentSearches, setRecentSearches] = useState<string[]>([]);
 const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
   loadRecentSearches();
 }, []);

 const loadRecentSearches = async () => {
   try {
     const recent = await AsyncStorage.getItem('recentSearches');
     if (recent) {
       setRecentSearches(JSON.parse(recent));
     }
   } catch (error) {
     console.error('최근 검색어 불러오기 실패:', error);
   }
 };

 // 최근 검색어 저장 및 관리를 위한 AsyncStorage 활용
 const saveRecentSearch = async (search: string) => {
   try {
     let searches = [...recentSearches];
     // 중복 검색어 제거하고 최신 검색어를 맨 앞에 추가
     searches = searches.filter(item => item !== search);
     searches.unshift(search);
     // 최대 10개까지만 저장
     searches = searches.slice(0, 10);
     
     await AsyncStorage.setItem('recentSearches', JSON.stringify(searches));
     setRecentSearches(searches);
   } catch (error) {
     console.error('최근 검색어 저장 실패:', error);
   }
 };

 // Google Places API를 활용한 장소 검색 및 자동완성 처리
 const handleSearch = async (text: string) => {
   setSearchText(text);
   
   if (text.trim() === '') {
     setSearchResults([]);
     return;
   }

   setIsLoading(true);
   try {
     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?\
input=${encodeURIComponent(text)}&\
key=${GOOGLE_MAPS_API_KEY}&\
language=ko&\
components=country:kr&\
types=geocode|establishment`;

     const response = await fetch(url);
     const data = await response.json();
     if (data.predictions) {
       setSearchResults(data.predictions);
     }
   } catch (error) {
     console.error('검색 실패:', error);
     setSearchResults([]);
   } finally {
     setIsLoading(false);
   }
 };

 const handlePlaceSelect = async (place: SearchResult) => {
  await saveRecentSearch(place.description);
  console.log('Selected Place ID:', place.place_id);
  navigation.goBack();
};

 const handleRecentSearchSelect = (search: string) => {
   setSearchText(search);
   handleSearch(search);
 };

 const handleRecentSearchDelete = async (searchToDelete: string) => {
   const newSearches = recentSearches.filter(search => search !== searchToDelete);
   setRecentSearches(newSearches);
   await AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches));
 };

 const clearAllSearches = async () => {
   setRecentSearches([]);
   await AsyncStorage.removeItem('recentSearches');
 };

 return (
   <SearchPageContainer>
     <TitleHeader>
       <TouchableOpacity onPress={() => navigation.goBack()}>
         <SvgXml xml={svg.back} width={18} height={18} />
       </TouchableOpacity>
       <TitleText>검색</TitleText>
     </TitleHeader>

     <SearchBarContainer>
       <SearchPageBar>
         <SvgXml xml={svg.search} width={20} height={20} />
         <SearchInput
           placeholder="장소를 검색해보세요"
           value={searchText}
           onChangeText={handleSearch}
           autoFocus
         />
       </SearchPageBar>
     </SearchBarContainer>

     {searchText || recentSearches.length > 0 ? (
       <RecentSearchContainer>
         {searchText ? (
           <RecentSearchContent>
             {searchResults.map((result) => (
               <SearchResultItem
                 key={result.place_id}
                 onPress={() => handlePlaceSelect(result)}
               >
                 <SvgXml xml={svg.spot} width={18} height={18} />
                 <ItemText>{result.description}</ItemText>
               </SearchResultItem>
             ))}
           </RecentSearchContent>
         ) : (
           <RecentSearchContent>
             <RecentSearchHeader>
               <HeaderText>최근 검색어</HeaderText>
               <ClearAllButton onPress={clearAllSearches}>
                 <ClearAllText>전체삭제</ClearAllText>
               </ClearAllButton>
             </RecentSearchHeader>
             {recentSearches.map((search, index) => (
               <RecentSearchItem
                 key={index}
                 onPress={() => handleRecentSearchSelect(search)}
               >
                 <SvgXml xml={svg.recent} width={20} height={20} />
                 <ItemText>{search}</ItemText>
                 <TouchableOpacity
                   onPress={() => handleRecentSearchDelete(search)}
                 >
                   <SvgXml xml={svg.delete} width={20} height={20} />
                 </TouchableOpacity>
               </RecentSearchItem>
             ))}
           </RecentSearchContent>
         )}
       </RecentSearchContainer>
     ) : (
       <NoResultContainer>
         <SvgXml xml={svg.noSearch} width={48} height={48} />
         <NoResultText>
           최근 검색한 기록이 없습니다{'\n'}
           두근두근 어디로 떠나볼까요?
         </NoResultText>
       </NoResultContainer>
     )}
   </SearchPageContainer>
 );
};