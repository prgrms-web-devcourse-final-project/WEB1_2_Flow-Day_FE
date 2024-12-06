import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostCreateStore from '@/store/post/post-create-store';

const PostCreateTitle = () => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  return (
    <PostCreateTitleDesign
      placeholder='제목을 입력해주세요'
      onChangeText={(text) => {
        setPostCreateData({...postCreateData, title: text});
      }}
    ></PostCreateTitleDesign>
  );
};

export default PostCreateTitle;

const PostCreateTitleDesign = styled.TextInput`
  width: 370px;
  height: 40px;
  margin: 10px auto;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
  font-size: 16px;
  font-family: 'SCDream5';
`;
