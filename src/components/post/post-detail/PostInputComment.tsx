import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import PostButton from './PostButton';
import {useStore} from '@/store/useStore';

const PostInputComment = ({postId}) => {
  const [text, setText] = useState('');
  const {accessToken} = useStore();

  // 댓글 전송 함수
  const postReply = async () => {
    if (text.trim() === '') {
      alert('댓글을 입력해주세요.');
      return;
    }

    try {
      const res = await axios.post(
        `http://flowday.kro.kr:80/api/v1/replies/${postId}`,
        {
          content: text,
          parentId: null, // 부모 댓글이 없으므로 null로 설정
        },
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );

      // 댓글 전송 성공 시
      console.log('댓글 작성 성공:', res.data);
      setText(''); // 텍스트 입력창 초기화
    } catch (err) {
      console.error('댓글 추가 에러 : ', err);
    }
  };

  // 엔터키를 눌렀을 때 댓글 전송
  const handleSubmitEditing = () => {
    postReply();
  };

  return (
    <InputCommentDesign>
      <InputComment
        multiline
        value={text}
        onChangeText={setText} // 텍스트 상태 업데이트
        placeholder='댓글을 입력하세요.'
        onSubmitEditing={handleSubmitEditing} // 엔터키 누를 시 댓글 전송
      />
      <ButtonDesign>
        <PostButton onPress={postReply}>입력</PostButton>
      </ButtonDesign>
    </InputCommentDesign>
  );
};

export default PostInputComment;

const InputCommentDesign = styled.View`
  width: 370px;
  height: 100px;
  margin: 10px auto;
  border: 1px solid #ff6666;
  border-radius: 6px;
  padding: 10px;
  position: relative;
`;

const InputComment = styled.TextInput`
  width: 100%;
  height: 60px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 5px;
`;

const ButtonDesign = styled.View`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
