import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostCreateStore from '@/store/post/post-create-store';
import styled from 'styled-components/native';

const PostCreateContents = () => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  return (
    <ContentsDesign>
      <ContentsInput
        value={postCreateData.contents}
        onChangeText={(text) => setPostCreateData({...postCreateData, contents: text})}
      />
    </ContentsDesign>
  );
};

export default PostCreateContents;

const ContentsDesign = styled.View`
  width: 370px;
  height: 150px;
  border: 1px solid #eeeeee;
  margin: 10px auto;
`;

const ContentsInput = styled.TextInput`
  height: 150px;
`;
