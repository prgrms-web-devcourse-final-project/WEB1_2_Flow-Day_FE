import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import usePostCreateStore from '@/store/post/post-create-store';
import styled from 'styled-components/native';

const PostCreateTagsInput = () => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  const [inputValue, setInputValue] = useState('');
  const [isTagComplete, setIsTagComplete] = useState(false);

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === ' ' || e.nativeEvent.key === 'Enter') {
      const tags = inputValue.split(' ').filter((tag) => tag.startsWith('#'));
      setPostCreateData({...postCreateData, tags: tags.join(' ')});
      setInputValue('');
      setIsTagComplete(true);
    } else {
      setIsTagComplete(false);
    }
  };

  console.log(postCreateData);
  return (
    <TagsInputDesign>
      <TagsInput value={inputValue} onChangeText={setInputValue} onKeyPress={handleKeyPress} placeholder='Enter tags with #' isTagComplete={isTagComplete} />
    </TagsInputDesign>
  );
};

export default PostCreateTagsInput;

const TagsInputDesign = styled.View`
  width: 200px;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #eeeeee;
`;

const TagsInput = styled(TextInput)<{isTagComplete: boolean}>`
  font-size: 12px;
  font-family: 'SCDream3';
  margin-top: auto;
  color: ${({isTagComplete}) => (isTagComplete ? '#FF6666' : '#000000')}; /* 태그가 완성되었을 때 파란색, 입력 중일 때 검정색 */
`;
