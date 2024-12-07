import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';

const InputText = styled.TextInput`
  width: 330px;
  height: 45px;
  margin: 10px;
  margin-right: auto;
  border: 1px solid #dddddd;
  border-radius: 6px;
`;

interface PostSearchProps {
  onSearch: (keyword: string) => void;
}

const PostSearch = ({onSearch}: PostSearchProps) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input); // 부모 컴포넌트로 검색된 키워드 전달
    }
  };

  return (
    <View>
      <InputText
        onChangeText={(text) => setInput(text)}
        placeholder='제목, 태그를 입력해주세요'
        value={input}
        onSubmitEditing={handleSearch} // 엔터를 누르면 검색 실행
      />
    </View>
  );
};

export default PostSearch;
