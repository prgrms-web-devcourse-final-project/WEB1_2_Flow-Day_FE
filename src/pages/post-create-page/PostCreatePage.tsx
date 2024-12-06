// PostCreatePage.tsx
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import PostHeader from '@/components/post/post-create/PostHeader';
import Buttons from '@/components/Buttons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

import PostCreateTitle from '@/components/post/post-create/PostCreateTitle';
import PostCreateTagsInput from '@/components/post/post-create/PostCreateTagsInput';
import PostCreateCategoryButton from '@/components/post/post-create/PostCreateCategoryButton';
import PostCreateCourseButton from '@/components/post/post-create/PostCreateCourseButton';
import PostCreateImages from '@/components/post/post-create/PostCreateImages';
import PostCategoryModal from '@/components/post/post-create/PostCategoryModal';
import PostCreateContents from '@/components/post/post-create/PostCreateContents';
import PostCreateCourseSlide from '@/components/post/post-create/PostCreateCourseSlide';
import {REACT_APP_SERVER_URL} from '@env';
import usePostCreateStore from '@/store/post/post-create-store';

const PostCreatePage = () => {
  const navigation = useNavigation();
  const [onModal, setOnModal] = useState(false);
  const [onSlide, setOnSlide] = useState(false);
  const {postCreateData} = usePostCreateStore();
  console.log(postCreateData);

  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJsb2dpbklkIjoic3RlcDQwNSIsImlkIjo4LCJyb2xlIjoiUk9MRV9VU0VSIn0sImlhdCI6MTczMzQ0OTAxNSwiZXhwIjoxNzMzODA5MDE1fQ.avGBI0OYO__C_49fYvwutooom_Oa7AEuFfF8UfQasE0';

  const uploadData = async () => {
    const formData = new FormData();
    formData.append('title', postCreateData.title);
    formData.append('tags', postCreateData.tags);
    formData.append('region', postCreateData.region);
    formData.append('season', postCreateData.season);
    formData.append('courseId', postCreateData.courseId.toString());
    formData.append('contents', postCreateData.contents);
    formData.append('status', postCreateData.status);
    // formData.append('images', postCreateData.images);

    console.log(formData);

    try {
      const res = await axios.post(`${REACT_APP_SERVER_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      });
      const data = await res.data;
      console.log('포스트 생성 : ', data);
    } catch (err) {
      console.error('포스트 생성 실패 :', err);
    }
  };

  return (
    <PostCreatePageDesign>
      <PostHeader />
      <PostCreateTitle />
      <StyleBox>
        <PostCreateTagsInput />
        <PostCreateCategoryButton
          onPress={() => {
            setOnModal(true); // 카테고리 버튼 클릭 시 모달 띄우기
          }}
        />
        <PostCreateCourseButton
          onPress={() => {
            setOnSlide(true);
          }}
        />
      </StyleBox>
      <PostCreateImages />
      <PostCreateContents />
      <Buttons.LongBtn
        text='작성 완료'
        onPress={() => {
          uploadData();
        }}
        disabled={false}
        style={{marginTop: 200}}
      />
      {onModal && <PostCategoryModal onPress={() => setOnModal(false)} />}
      {onSlide && <PostCreateCourseSlide onPress={() => setOnSlide(false)} />}
    </PostCreatePageDesign>
  );
};

export default PostCreatePage;

const PostCreatePageDesign = styled.ScrollView`
  background-color: #fff;
  width: 100%;
`;

const StyleBox = styled.View`
  width: 370px;
  height: 50px;
  margin: 10px auto;
  flex-direction: row;
`;
