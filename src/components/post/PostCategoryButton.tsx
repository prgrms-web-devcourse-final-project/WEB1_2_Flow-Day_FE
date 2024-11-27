import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const CategoryButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const CategoryIcon = styled.Image`
  width: 36px;
  height: 36px;
  margin: auto;
`;

const PostCategoryButton = () => {
  return (
    <CategoryButton onPress={() => {}}>
      <CategoryIcon source={require('../../assets/icons/category.png')} />
    </CategoryButton>
  );
};

export default PostCategoryButton;
