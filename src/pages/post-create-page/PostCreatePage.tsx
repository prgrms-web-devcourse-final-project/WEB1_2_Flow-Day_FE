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
import {useStore} from '@/store/useStore';

const PostCreatePage = () => {
  const navigation = useNavigation();
  const [onModal, setOnModal] = useState(false);
  const [onSlide, setOnSlide] = useState(false);
  const {postCreateData} = usePostCreateStore();
  const {accessToken} = useStore();

  const uploadData = async () => {
    const formData = new FormData();

    formData.append('title', postCreateData.title);
    formData.append('tags', postCreateData.tags);
    formData.append('region', postCreateData.region);
    formData.append('season', postCreateData.season);
    if (postCreateData.courseId !== 0) {
      formData.append('courseId', postCreateData.courseId as any);
    }
    formData.append('contents', postCreateData.contents);
    formData.append('status', postCreateData.status);
    if (postCreateData.images.length > 0) {
      postCreateData.images.map((img, index) => {
        var photo = {
          uri: img.uri,
          type: 'image/png',
          name: `image${index}.png`,
        };
        formData.append('images', photo as any);
      });
    }

    try {
      const res = await axios.post(`${REACT_APP_SERVER_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
