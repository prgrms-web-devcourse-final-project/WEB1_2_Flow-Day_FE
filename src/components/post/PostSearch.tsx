import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';

const InputText = styled.TextInput`
  width: 330px;
  height: 45px;
  margin: 10px;
  margin-right: auto;
  border: 1px solid #dddddd;
  border-radius: 6px;
`;

const PostSearch = () => {
  const [input, setInput] = useState('');

  const getSearchedPost = async () => {
    try {
      const token = ''; // 토큰 넣어주기.
      const res = await axios.get(
        'http://flowday.kro.kr:5000/api/v1/posts/all/latest?pageSize=10&page=0',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const searchedPost = res.data.content;
      console.log(searchedPost); // 삭제 예정
      // PostListPage에 있는 [postData,setPostData] props로 가져와서 데이터 수정해주기
    } catch (err) {
      console.error('포스트 검색 API 에러 : ', err);
    }
  };

  return (
    <InputText
      onChangeText={text => setInput(text)}
      placeholder="제목, 태그를 입력해주세요"
      value={input}
    />
  );
};

export default PostSearch;
