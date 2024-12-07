// PostEditCourseButton.tsx
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostEditStore from '@/store/post/post-edit-store'; // usePostEditStore로 변경
import styled from 'styled-components/native';

const PostEditCourseButton = ({onPress}: {onPress: () => void}) => {
  // 컴포넌트 이름 변경
  const {postEditData, setPostEditData} = usePostEditStore(); // usePostEditStore로 변경

  return (
    <CourseButton onPress={onPress}>
      <CourseText>코스 선택</CourseText>
    </CourseButton>
  );
};

export default PostEditCourseButton;

const CourseButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  background-color: #ffeadd;
  border-radius: 6px;
  margin: auto 0px;
  margin-left: 10px;
`;

const CourseText = styled.Text`
  font-size: 12px;
  font-family: 'SCDream5';
  text-align: center;
  margin: auto;
`;
