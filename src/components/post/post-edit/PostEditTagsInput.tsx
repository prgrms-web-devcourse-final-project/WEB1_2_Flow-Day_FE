import React, {useState, useEffect} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import usePostEditStore from '@/store/post/post-edit-store'; // usePostEditStore로 변경
import styled from 'styled-components/native';

const PostEditTagsInput = () => {
  const {postEditData, setPostEditData} = usePostEditStore(); // usePostEditStore로 변경
  const [inputValue, setInputValue] = useState('');
  const [isTagComplete, setIsTagComplete] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 postEditData.tags를 inputValue로 초기화
  useEffect(() => {
    if (postEditData.tags) {
      setInputValue(postEditData.tags); // 기존 태그들이 inputValue로 초기화
    }
  }, [postEditData.tags]);

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === ' ' || e.nativeEvent.key === 'Enter') {
      const tags = inputValue.split(' ').filter((tag) => tag.startsWith('#'));
      setPostEditData({...postEditData, tags: tags.join(' ')}); // setPostEditData로 변경
      setInputValue('');
      setIsTagComplete(true);
    } else {
      setIsTagComplete(false);
    }
  };

  return (
    <TagsInputDesign>
      <TagsInput value={inputValue} onChangeText={setInputValue} onKeyPress={handleKeyPress} placeholder='Enter tags with #' isTagComplete={isTagComplete} />
    </TagsInputDesign>
  );
};

export default PostEditTagsInput;

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
  color: ${({isTagComplete}) => (isTagComplete ? '#FF6666' : '#000000')}; /* 태그가 완성되었을 때 색상 변경 */
`;
