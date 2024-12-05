import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import usePostDetailStore from '@/store/post/post-detail-store';
import styled from 'styled-components/native';

const PostTag = () => {
  const {postDetailData} = usePostDetailStore();
  const tagList = postDetailData.tags.split(' ');

  return (
    <PostTagDesign horizontal={true} showsHorizontalScrollIndicator={false}>
      {tagList.map((tag, i) => {
        return (
          <TagBox key={i}>
            <TagText>{tag}</TagText>
          </TagBox>
        );
      })}
    </PostTagDesign>
  );
};

export default PostTag;

const PostTagDesign = styled.ScrollView`
  flex-direction: row;
  margin: 10px auto;
  height: 30px; /* ScrollView의 세로 크기 고정 */
  max-height: 30px; /* 최대 높이 제한 */
`;
const TagBox = styled.View`
  padding: 0 10px;
  background-color: #ffeadd;
  margin-right: 5px;
  border-radius: 6px;
  height: 20px;
  justify-content: center;
`;

const TagText = styled.Text`
  font-family: SCDream5;
  font-size: 12px;
  text-align: center;
  margin: auto;
`;
