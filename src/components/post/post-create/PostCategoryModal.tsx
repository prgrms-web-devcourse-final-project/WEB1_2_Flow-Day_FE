import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import usePostCreateStore from '@/store/post/post-create-store';

const PostCategoryModal = ({onPress}: {onPress: () => void}) => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  const seasonArr = ['전체', '봄', '여름', '가을', '겨울'];
  const regionArr = ['전체', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

  const [selectSeason, setSelectSeason] = useState<string[]>([]);
  const [selectRegion, setSelectRegion] = useState<string[]>([]);

  const handleSelectSeason = (season: string) => {
    setSelectSeason((prevState) => (prevState.includes(season) ? prevState.filter((item) => item !== season) : [...prevState, season]));
  };

  const handleSelectRegion = (region: string) => {
    setSelectRegion((prevState) => (prevState.includes(region) ? prevState.filter((item) => item !== region) : [...prevState, region]));
  };

  const handleComplete = () => {
    setPostCreateData({...postCreateData, season: selectSeason.join(' '), region: selectRegion.join(' ')});
    onPress();
  };

  return (
    <CategoryBlur onPress={onPress}>
      <CategoryModal onStartShouldSetResponder={() => true}>
        <CategoryTitle>
          <CategoryTitleText>카테고리</CategoryTitleText>
        </CategoryTitle>
        <Content>
          <ContentTitle>
            <ContentTitleText>계절</ContentTitleText>
          </ContentTitle>
          <SelectButtonList>
            {seasonArr.map((season, i) => (
              <SelectButton onPress={() => handleSelectSeason(season)} selected={selectSeason.includes(season)} key={i}>
                <SelectButtonText selected={selectSeason.includes(season)}>{`${season}`}</SelectButtonText>
              </SelectButton>
            ))}
          </SelectButtonList>
        </Content>
        <Content>
          <ContentTitle>
            <ContentTitleText>지역</ContentTitleText>
          </ContentTitle>
          <SelectButtonList>
            {regionArr.map((region, i) => (
              <SelectButton onPress={() => handleSelectRegion(region)} selected={selectRegion.includes(region)} key={i}>
                <SelectButtonText selected={selectRegion.includes(region)}>{`${region}`}</SelectButtonText>
              </SelectButton>
            ))}
          </SelectButtonList>
        </Content>
        <CompleteButton onPress={handleComplete}>
          <CompleteButtonText>완료</CompleteButtonText>
        </CompleteButton>
      </CategoryModal>
    </CategoryBlur>
  );
};

export default PostCategoryModal;

const CategoryModal = styled.View`
  width: 300px;
  height: 550px;
  background-color: #fff;
  z-index: 100;
  border-radius: 8px;
  margin: 0 auto;
  pointer-events: auto;
`;

const CategoryTitle = styled.View`
  width: 300px;
  height: 40px;
  border: 1px solid #dddddd;
`;

const CategoryTitleText = styled.Text`
  margin: auto;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.View`
  width: 300px;
  margin: 20px auto;
  padding: 0 10px;
`;

const ContentTitle = styled.View`
  width: 50px;
  height: 30px;
`;

const ContentTitleText = styled.Text`
  width: 50px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const SelectButtonList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const SelectButton = styled.TouchableOpacity<{selected: boolean}>`
  width: 60px;
  height: 30px;
  background-color: ${({selected}) => (selected ? '#ff6666' : '#ffeadd')};
  justify-content: center;
  border-radius: 6px;
  margin: 5px;
`;

const SelectButtonText = styled.Text<{selected: boolean}>`
  width: 50px;
  font-size: 13px;
  margin: auto;
  text-align: center;
  color: ${({selected}) => (selected ? '#ffffff' : '#000000')};
`;

const CompleteButton = styled.TouchableOpacity`
  width: 200px;
  height: 40px;
  background-color: #ff6666;
  margin: 10px auto;
  border-radius: 6px;
`;

const CompleteButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  margin: auto;
  text-align: center;
`;

const CategoryBlur = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
`;
