import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
import {useStore} from '@/store/useStore';

const PostLikeButton = () => {
  const {postDetailData, updatePostDetailData} = usePostDetailStore(); // 상태 업데이트 함수를 가져옵니다
  const {accessToken} = useStore();
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 관리하는 state

  const fetchLike = async () => {
    if (isLiked) return; // 이미 좋아요가 눌렸으면 더 이상 실행하지 않음

    try {
      // 서버에 좋아요 요청을 보냅니다
      const res = await axios.post(
        `${REACT_APP_SERVER_URL}/likes/posts/${postDetailData.id}`,
        {},
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );

      // 서버 응답 후 좋아요 카운트를 1 증가시킵니다
      if (res.status === 200) {
        // 좋아요 상태를 true로 설정
        setIsLiked(true);

        // postDetailData를 업데이트
        updatePostDetailData({
          ...postDetailData,
          likeCount: postDetailData.likeCount + 1, // 좋아요 수 증가
        });
      }
    } catch (err) {
      console.error('좋아요 에러 : ', err);
    }
  };

  return (
    <PostLikeButtonDesign onPress={fetchLike} disabled={isLiked}>
      <LikeIcon source={require('../../../assets/icons/like.png')} />
      <LikeCount>{postDetailData.likeCount}</LikeCount>
    </PostLikeButtonDesign>
  );
};

export default PostLikeButton;

const PostLikeButtonDesign = styled.TouchableOpacity`
  margin-right: 20px;
  height: 20px;
  flex-direction: row;
  ${({disabled}) =>
    disabled &&
    `
    transform:scale(1.1);   
  `}
`;

const LikeIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: auto 0px;
  margin-right: 5px;
`;

const LikeCount = styled.Text`
  font-size: 12px;
  font-family: 'SCDream5';
  margin: auto 0px;
`;
