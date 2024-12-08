import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostCreateStore from '@/store/post/post-create-store';
import styled from 'styled-components/native';

const PostCreateCourseButton = ({onPress}: {onPress: () => void}) => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  return (
    <CourseButton onPress={onPress}>
      <CourseText>코스 선택</CourseText>
    </CourseButton>
  );
};

export default PostCreateCourseButton;

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
