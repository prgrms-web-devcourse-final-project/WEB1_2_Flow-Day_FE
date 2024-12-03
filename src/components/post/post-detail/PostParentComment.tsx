import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const PostParentComment = () => {
  return (
    <ParentCommentDesign>
      <ProfileImage
        source={require('../../../assets/images/profile.png')}
        alt="프사"
      />
      <CommentInfoBox>
        <TextBox>
          <Icon source={require('../../../assets/icons/nickname.png')} />
          <NicknameText>닉네임입니다</NicknameText>
          <Icon source={require('../../../assets/icons/date.png')} />
          <DateText>2024/12/13 12:15</DateText>
        </TextBox>
        <CommentText>댓글입니당</CommentText>
      </CommentInfoBox>
      <LikeBox>
        <LikeIcon source={require('../../../assets/icons/like.png')} />
        <LikeText>1234</LikeText>
      </LikeBox>
    </ParentCommentDesign>
  );
};

export default PostParentComment;

const ParentCommentDesign = styled.View`
  width: 370px;
  height: 60px;
  margin: 0 auto;
  border: 1px solid #eeeeee;
  flex-direction: row;
`;

const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 100px;
  margin: auto 5px;
`;

const CommentInfoBox = styled.View`
  margin: auto 5px;
`;

const TextBox = styled.View`
  flex-direction: row;
`;

const Icon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 3px;
`;
const NicknameText = styled.Text`
  height: 20px;
  font-size: 12px;
  font-family: 'SCDream4';
  margin-right: 5px;
`;

const DateText = styled.Text`
  height: 20px;
`;

const CommentText = styled.Text`
  width: 270px;
  margin-right: auto;
  font-size: 14px;
  font-family: 'SCDream3';
`;

const LikeBox = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  margin: auto 10px;
  margin-left: auto;
`;

const LikeIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: 0 auto;
`;

const LikeText = styled.Text`
  font-size: 10px;
  font-family: 'SCDream5';
  margin: 0 auto;
  text-align: center;
`;
