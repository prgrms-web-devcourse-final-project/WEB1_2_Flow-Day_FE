import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostEditStore from '@/store/post/post-edit-store';

const PostEditTitle = () => {
  const {postEditData, setPostEditData} = usePostEditStore();
  return (
    <PostEditTitleDesign
      placeholder='제목을 입력해주세요'
      onChangeText={(text) => {
        setPostEditData({...postEditData, title: text});
      }}
      value={postEditData.title}
    ></PostEditTitleDesign>
  );
};

export default PostEditTitle;

const PostEditTitleDesign = styled.TextInput`
  width: 370px;
  height: 40px;
  margin: 10px auto;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
  font-size: 16px;
  font-family: 'SCDream5';
`;
