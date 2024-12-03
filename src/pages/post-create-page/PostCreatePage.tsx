import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/post-create/PostHeader';
import Buttons from '@/components/Buttons';
import { useNavigation } from '@react-navigation/native';

const PostCreatePage = () => {
  const navigation = useNavigation();
  return (
    <PostCreatePageDesign>
      <PostHeader />
      {/* <PostCreateTitle />
      <PostCreateTagsInput />
      <PostCreateCategoryButton />
      <PostCreateCourseButton />
      <PostCreateEditor />
      <PostCreateContentsInput /> */}
      <Buttons.LongBtn
        text="작성 완료"
        onPress={() => console.log('Long Button Clicked')}
        disabled={false}
        style={{ marginBottom: 10 }}
      />
    </PostCreatePageDesign>
  );
};

export default PostCreatePage;

const PostCreatePageDesign = styled.ScrollView``;
