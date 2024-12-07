import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import PostHeader from '@/components/post/PostHeader';
import Buttons from '@/components/Buttons';
import {useNavigation} from '@react-navigation/native';
import PostEditTitle from '@/components/post/post-edit/PostEditTitle';
import PostEditTagsInput from '@/components/post/post-edit/PostEditTagsInput';
import PostEditCategoryButton from '@/components/post/post-edit/PostEditCategoryButton';
import PostEditCourseButton from '@/components/post/post-edit/PostEditCourseButton';
import PostEditImages from '@/components/post/post-edit/PostEditImages';
import PostEditContents from '@/components/post/post-edit/PostEditContents';
import PostEditCategoryModal from '@/components/post/post-edit/PostEditCategoryModal';
import PostEditCourseSlide from '@/components/post/post-edit/PostEditCourseSlide';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
import usePostEditStore from '@/store/post/post-edit-store'; // 수정 페이지에 해당하는 store 사용
import styled from 'styled-components/native';
import {useStore} from '@/store/useStore';

const PostEditPage = ({route}) => {
  const navigation = useNavigation();
  const [onModal, setOnModal] = useState(false);
  const [onSlide, setOnSlide] = useState(false);
  const {postEditData, setPostEditData} = usePostEditStore(); // 수정 데이터를 가져옴
  const {accessToken} = useStore();
  const {postId} = route.params;

  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = (await res).data;
        setPostEditData(data);
      } catch (err) {
        console.error('포스트 수정 데이터 불러오기 에러 : ', err);
      }
    };
    getPostData();
  }, [postId]);

  //test
  useEffect(() => {
    console.log('postEditData:', postEditData);
  }, [postEditData]);

  const uploadData = async () => {
    const formData = new FormData();

    formData.append('title', postEditData.title);
    formData.append('tags', postEditData.tags);
    formData.append('region', postEditData.region);
    formData.append('season', postEditData.season);
    if (postEditData.courseId !== 0) {
      formData.append('courseId', postEditData.courseId as any);
    }
    formData.append('contents', postEditData.contents);
    formData.append('status', postEditData.status);
    if (postEditData.images.length > 0) {
      postEditData.images.map((img, index) => {
        var photo = {
          uri: img.uri,
          type: 'image/png',
          name: `image${index}.png`,
        };
        formData.append('images', photo as any);
      });
    }

    try {
      const res = await axios.put(`${REACT_APP_SERVER_URL}/posts/${postEditData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data',
        },
      });
      const data = await res.data;
      console.log('포스트 수정 : ', data);
    } catch (err) {
      console.error('포스트 수정 실패 :', err);
    }
  };

  return (
    <PageDesign>
      <PostHeader />
      <PostEditTitle />
      <StyleBox>
        <PostEditTagsInput />
        <PostEditCategoryButton
          onPress={() => {
            setOnModal(true);
          }}
        />
        <PostEditCourseButton
          onPress={() => {
            setOnSlide(true);
          }}
        />
      </StyleBox>
      <PostEditImages />
      <PostEditContents />
      <Buttons.LongBtn
        text='수정 완료'
        onPress={() => {
          uploadData(); // 수정된 데이터를 서버에 전송
        }}
        disabled={false}
        style={{marginTop: 200}}
      />
      {onModal && <PostEditCategoryModal onPress={() => setOnModal(false)} />}
      {onSlide && <PostEditCourseSlide onPress={() => setOnSlide(false)} />}
    </PageDesign>
  );
};

export default PostEditPage;

const PageDesign = styled.ScrollView`
  background-color: #fff;
  width: 100%;
`;

const StyleBox = styled.View`
  width: 370px;
  height: 50px;
  margin: 10px auto;
  flex-direction: row;
`;
