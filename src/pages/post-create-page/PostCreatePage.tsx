import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/post-create/PostHeader';
import Buttons from '@/components/Buttons';
import { useNavigation } from '@react-navigation/native';

import PostCreateTitle from '@/components/post/post-create/PostCreateTitle';
import PostCreateTagsInput from '@/components/post/post-create/PostCreateTagsInput';
import PostCreateCategoryButton from '@/components/post/post-create/PostCreateCategoryButton';
import PostCreateCourseButton from '@/components/post/post-create/PostCreateCourseButton';
import PostCreateEditor from '@/components/post/post-create/PostCreateEditor';
import PostCreateContentsInput from '@/components/post/post-create/PostCreateContentsInput';

const PostCreatePage = () => {
  const navigation = useNavigation();
  return (
    <PostCreatePageDesign>
      <PostHeader />
      <PostCreateTitle />
      <PostCreateTagsInput />
      <PostCreateCategoryButton />
      <PostCreateCourseButton />
      <PostCreateEditor />
      <PostCreateContentsInput />
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

const PostCreatePageDesign = styled.ScrollView`
  background-color: #fff;
`;
