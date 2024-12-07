import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import usePostDetailStore from '@/store/post/post-detail-store';

const SaveCourse = () => {
  const {postDetailData} = usePostDetailStore();

  /** 코스 저장 클릭 시 나의 코스로 저장되는 API 요청 - 수정 예정 */
  const saveCourse = async () => {
    try {
      // const res = axios.post();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CourseButton
      onPress={() => {
        // 수정 예정
        saveCourse();
      }}
    >
      <ButtonText>코스 저장</ButtonText>
    </CourseButton>
  );
};

export default SaveCourse;

const CourseButton = styled.TouchableOpacity`
  width: 80px;
  height: 20px;
  background-color: #ff6666;
  border-radius: 6px;
`;

const ButtonText = styled.Text`
  width: 70px;
  color: #ffffff;
  font-size: 12px;
  font-family: 'SCDream5';
  text-align: center;
  margin: auto;
`;
