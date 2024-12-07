import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';

const PostInfo = () => {
  const {postDetailData} = usePostDetailStore();
  const [date, time] = postDetailData.createdAt.split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');
  return (
    <PostInfoDesign>
      <Icon source={require('../../../assets/icons/date.png')} />
      <InfoText>{`${year}/${month}/${day} ${hour}:${minute}`}</InfoText>
      <Icon source={require('../../../assets/icons/nickname.png')} />
      <InfoText>{postDetailData.nickName}</InfoText>
    </PostInfoDesign>
  );
};

export default PostInfo;

const PostInfoDesign = styled.View`
  width: 250px;
  height: 30px;
  flex-direction: row;
`;

const Icon = styled.Image`
  width: 16px;
  height: 16px;
  margin: auto 0;
  margin-right: 3px;
`;

const InfoText = styled.Text`
  height: 20px;
  margin: auto 0;
  margin-right: 10px;
  font-size: 14px;
  font-family: 'SCDream3';
  text-align: center;
`;
