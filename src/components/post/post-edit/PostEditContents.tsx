import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostEditStore from '@/store/post/post-edit-store'; // 수정 페이지에서 사용하는 store로 변경
import styled from 'styled-components/native';

const PostEditContents = () => {
  const {postEditData, setPostEditData} = usePostEditStore(); // 수정 페이지 데이터로 변경

  return (
    <ContentsDesign>
      <ContentsInput
        value={postEditData.contents} // 수정 데이터에 맞게 적용
        onChangeText={(text) => setPostEditData({...postEditData, contents: text})} // 데이터 업데이트
      />
    </ContentsDesign>
  );
};

export default PostEditContents;

const ContentsDesign = styled.View`
  width: 370px;
  height: 150px;
  border: 1px solid #eeeeee;
  margin: 10px auto;
`;

const ContentsInput = styled.TextInput`
  height: 150px;
`;
