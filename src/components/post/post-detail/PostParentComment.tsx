import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';
import {useStore} from '@/store/useStore';
import axios from 'axios';

interface IReply {
  id: number;
  content: string;
  memberName: string | null;
  likeCount: number;
  createdAt: string;
}

const PostParentComment = ({comment}: {comment: IReply}) => {
  const {replyData, setReplyData} = usePostDetailStore();
  const {accessToken} = useStore();

  // 댓글 작성일과 시간 포맷 처리
  const [date, time] = comment.createdAt.split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');

  // 좋아요 API 호출 후 상태 업데이트
  const postLikeReply = async (replyId: number) => {
    try {
      const res = await axios.get(`http://flowday.kro.kr:80/api/v1/likes/replies/${comment.id}`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });
      const data = res.data;
      console.log('댓글 좋아요 성공!');
      // 좋아요 카운트를 하나 증가시킨 후 상태 업데이트
      setReplyData(
        replyData.map((reply) =>
          reply.id === replyId
            ? {...reply, likeCount: reply.likeCount + 1} // 좋아요 수 증가
            : reply,
        ),
      );
    } catch (error) {
      console.error('Error liking the reply:', error);
    }
  };

  return (
    <ParentCommentDesign>
      <ProfileImage source={require('../../../assets/images/profile.png')} />
      <CommentInfoBox>
        <TextBox>
          <Icon source={require('../../../assets/icons/nickname.png')} />
          <NicknameText>{`홍길동`}</NicknameText>
          <Icon source={require('../../../assets/icons/date.png')} />
          <DateText>{`${year}/${month}/${day} ${hour}:${minute}`}</DateText>
        </TextBox>
        <CommentText>{comment.content}</CommentText>
      </CommentInfoBox>
      <LikeBox
        onPress={() => {
          postLikeReply(comment.id);
        }}
      >
        <LikeIcon source={require('../../../assets/icons/like.png')} />
        <LikeText>{comment.likeCount}</LikeText>
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
