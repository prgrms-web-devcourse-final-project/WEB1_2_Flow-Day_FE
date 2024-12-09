import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

// API 완성 후 Type 수정 예정
const PostItem = (data: any) => {
  const postData = data.postData;
  const navigation = useNavigation();
  const [year, month, day] = postData.createdAt.split('T')[0].split('-');
  console.log('postData', postData);

  return (
    <PostItemDesign onPress={() => navigation.navigate('PostDetailPage', {postId: postData.id})}>
      <PostTexts>
        <Title>{postData.title}</Title>
        <ContentPreview>{postData.content}</ContentPreview>
        <PostInfo>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/like.png')} />
            <InfoText>{postData.likeCount}</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/comment.png')} />
            <InfoText>{postData.commentCount}</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/nickname.png')} />
            <InfoText>{postData.nickName}</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/createdAt.png')} />
            <InfoText>{`${year}/${month}/${day}`}</InfoText>
          </InfoBox>
        </PostInfo>
      </PostTexts>
      {postData.imageURL ? <PostImage source={{uri: postData.imageURL}} /> : <PostImage source={require('../../assets/images/noImage.png')} />}
    </PostItemDesign>
  );
};

export default PostItem;

const PostItemDesign = styled.TouchableOpacity`
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
  margin: 5px 10px;
  flex-direction: row;
`;

const PostTexts = styled.View`
  width: 250px;
  height: 100px;
  margin: 0 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  width: 250px;
  height: 20px;
  justify-content: center;
  margin: 0 auto;
  margin-top: 15px;
`;

const ContentPreview = styled.Text`
  font-size: 14px;
  width: 250px;
  height: 20px;
  justify-content: center;
  margin: 10px auto;
`;

const PostInfo = styled.View`
  height: 20px;
  flex-direction: row;
  margin: 0 auto;
  margin-left: 0;
`;
const InfoBox = styled.View`
  flex-direction: row;
  margin-right: 10px;
`;
const InfoIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;
const InfoText = styled.Text`
  font-size: 12px;
`;
const PostImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 5px;
  margin-left: auto;
`;
