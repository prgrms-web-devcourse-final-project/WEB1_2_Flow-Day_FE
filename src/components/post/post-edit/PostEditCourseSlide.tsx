import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
import usePostEditStore from '@/store/post/post-edit-store'; // 수정 페이지 store로 변경
import Buttons from '@/components/Buttons';
import {SvgXml} from 'react-native-svg';
import {svg} from '../../../assets/icons/svg';
import {useStore} from '@/store/useStore';

const PostEditCourseSlide = ({onPress}: {onPress: () => void}) => {
  const {postEditData, setPostEditData} = usePostEditStore(); // 수정 페이지에서 사용하는 데이터
  const {accessToken} = useStore();

  useEffect(() => {
    const getCourseList = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/courses`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = res.data;
        setPostEditData({...data}); // 수정 데이터 저장
      } catch (err) {
        console.error('수정 페이지에서 코스 목록 가져오기 에러 : ', err);
      }
    };
    getCourseList();
  }, []);

  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  return (
    <CourseSlideDesign>
      <SlideHeader>
        <SlideText>전체 리스트</SlideText>
        <CourseCreateButton>
          <AddIcon source={require('../../../assets/icons/add.png')}></AddIcon>
          <CourseCraeteText>새 코스 생성</CourseCraeteText>
        </CourseCreateButton>
      </SlideHeader>
      <CourseList>
        {postEditData.content?.map((course, i) => {
          return (
            <CourseItem
              key={i}
              onPress={() => {
                setPostEditData({...postEditData, courseId: `${course.id}`}); // 수정된 데이터 업데이트
              }}
            >
              <ItemIcon source={require('../../../assets/icons/spot.svg')} />
              <SvgXml xml={getModifiedSvg(svg.spotItem, course.color ? course.color : '#000000')} />
              <CourseTitle>{`${course.title}`}</CourseTitle>
              {postEditData.courseId === `${course.id}` ? <CheckIcon source={require('../../../assets/icons/check.png')} /> : <CheckIcon source={require('../../../assets/icons/unCheck.png')} />}
            </CourseItem>
          );
        })}
      </CourseList>
      <Buttons.LongBtn text='코스 선택 완료' onPress={onPress} disabled={false} style={{}} />
    </CourseSlideDesign>
  );
};

export default PostEditCourseSlide;

const CourseSlideDesign = styled.View`
  width: 100%;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  position: absolute;
  bottom: -25px;
`;

const SlideHeader = styled.View`
  width: 100%;
  height: 50px;
  margin: 0px auto;
  border-radius: 50px;
`;

const SlideText = styled.Text`
  width: 150px;
  height: 20px;
  font-size: 16px;
  font-family: 'SCDream5';
  text-align: center;
  margin: 5px auto;
`;

const CourseCreateButton = styled.TouchableOpacity`
  width: 100px;
  height: 20px;
  margin: 0px 0px;
  margin-left: auto;
  flex-direction: row;
`;

const AddIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const CourseCraeteText = styled.Text`
  font-size: 12px;
  font-family: 'SCDream4';
  margin: 0 auto;
  text-align: center;
`;

const CourseList = styled.ScrollView`
  width: 100%;
  border: 1px solid #eeeeee;
`;

const CourseItem = styled.TouchableOpacity`
  width: 370px;
  height: 60px;
  flex-direction: row;
  align-items: center;
`;

const ItemIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const CourseTitle = styled.Text`
  margin: auto 10px;
  width: 200px;
`;

const CheckIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin: auto 0px;
  margin-left: auto;
`;

const COLORS = {
  active: '#FF6666',
  inactive: '#000000',
};
