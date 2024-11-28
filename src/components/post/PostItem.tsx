import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

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
  width: 90px;
  height: 90px;
  margin: 5px;
  border: 1px solid #dddddd;
  margin-left: auto;
`;

const PostItem = data => {
  const postData = data.postData;
  // const [year, month, day] = postData.createdAt.split('T')[0].split('-');
  return (
    <PostItemDesign>
      <PostTexts>
        <Title>{postData.title}</Title>
        <ContentPreview>{postData.contents}</ContentPreview>
        <PostInfo>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/like.png')} />
            <InfoText>1234</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/comment.png')} />
            <InfoText>1234</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/nickname.png')} />
            <InfoText>{postData.nickName}</InfoText>
          </InfoBox>
          <InfoBox>
            <InfoIcon source={require('../../assets/icons/createdAt.png')} />
            {/* <InfoText>{createdAt}</InfoText> */}
            {/* <InfoText>{`${year}/${month}/${day}`}</InfoText> */}
          </InfoBox>
        </PostInfo>
      </PostTexts>
      {postData.images ? (
        <PostImage source={postData.Image} />
      ) : (
        <PostImage source={require('../../assets/images/noImage.png')} />
      )}
      {/* <PostImage source={require('../../assets/images/noImage.png')} /> */}
    </PostItemDesign>
  );
};

export default PostItem;

const styles = StyleSheet.create({});
