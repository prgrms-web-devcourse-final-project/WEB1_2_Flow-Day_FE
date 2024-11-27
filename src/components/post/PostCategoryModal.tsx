import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const CategoryBlur = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 검정색 배경 */
`;

const CategoryModal = styled.View`
  width: 300px;
  height: 550px;
  background-color: #fff;
  margin: auto;
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

const SelectButton = styled.TouchableOpacity`
  width: 60px;
  height: 30px;
  background-color: #ffeadd;
  justify-content: center;
  border-radius: 6px;
  margin: 5px;
`;

const SelectButtonText = styled.Text`
  width: 50px;
  font-size: 13px;
  margin: auto;
  text-align: center;
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

const PostCategoryModal = () => {
  const seasonArr = ['전체', '봄', '여름', '가을', '겨울'];
  const regionArr = [
    '전체',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ];
  return (
    <CategoryBlur>
      <CategoryModal>
        <CategoryTitle>
          <CategoryTitleText>카테고리</CategoryTitleText>
        </CategoryTitle>
        <Content>
          <ContentTitle>
            <ContentTitleText>계절</ContentTitleText>
          </ContentTitle>
          <SelectButtonList>
            {seasonArr.map((season, i) => {
              return (
                <SelectButton>
                  <SelectButtonText>{season}</SelectButtonText>
                </SelectButton>
              );
            })}
          </SelectButtonList>
        </Content>
        <Content>
          <ContentTitle>
            <ContentTitleText>계절</ContentTitleText>
          </ContentTitle>
          <SelectButtonList>
            {regionArr.map((region, i) => {
              return (
                <SelectButton>
                  <SelectButtonText>{region}</SelectButtonText>
                </SelectButton>
              );
            })}
          </SelectButtonList>
        </Content>
        <CompleteButton>
          <CompleteButtonText>완료</CompleteButtonText>
        </CompleteButton>
      </CategoryModal>
    </CategoryBlur>
  );
};

export default PostCategoryModal;

const styles = StyleSheet.create({});
