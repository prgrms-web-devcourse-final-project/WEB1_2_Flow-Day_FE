import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
import usePostCreateStore from '@/store/post/post-create-store';
import Buttons from '@/components/Buttons';
import {SvgXml} from 'react-native-svg';
import {svg} from '@/assets/icons/svg';
import {useStore} from '@/store/useStore';
import apiClient from '@/utils/apiClient';

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

const Input = styled.TextInput`
  border: 1px solid #dddddd;
  width: 90%;
  height: 30px;
  margin: 0 15px;
  border-radius: 6px;
  font-family: 'SCDream4';
  padding: 0 12px;
`;

const CourseChoiceSlide = ({data, setShow}) => {
  const {postList, setPostList, postCreateData, setPostCreateData} = usePostCreateStore();
  const {accessToken} = useStore();
  const [text, setText] = useState('');
  const [id, setId] = useState();

  useEffect(() => {
    const getCouserList = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/courses`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = (await res.data);
        setPostList({...data});
      } catch (err) {
        console.error('포스트 생성 페이지에서 코스 목록 가져오기 에러 : ', err);
      }
    };
    getCouserList();
  }, []);

  const handleSave = async () => {
    const courseId = id;
    const place = data?.formatted_address.split(' ')[1].slice(0, 2);
    try {
      const response = await apiClient.post(
        `/courses/${courseId}`,
        {
          name: data.name,
          placeId: data.place_id,
          comment: text,
          city: place,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(postCreateData.courseId);
  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  return (
    <CourseSlideDesign>
      <SlideHeader>
        <SlideText>전체 리스트</SlideText>
        <CourseCreateButton>
          <AddIcon source={require('@/assets/icons/add.png')}></AddIcon>
          <CourseCraeteText>새 코스 생성</CourseCraeteText>
        </CourseCreateButton>
      </SlideHeader>
      <CourseList>
        {postList.content.map((course, i) => {
          return (
            <View>
              <CourseItem
                key={i}
                onPress={() => {
                  setPostCreateData({...postCreateData, courseId: `${course.id}`});
                  setId(course.id);
                }}
              >
                <ItemIcon source={require('@/assets/icons/spot.svg')} />
                <SvgXml xml={getModifiedSvg(svg.spotItem, course.color ? course.color : '#000000')} />
                <CourseTitle>{`${course.title}`}</CourseTitle>
                {postCreateData.courseId === `${course.id}` ? <CheckIcon source={require('@/assets/icons/check.png')} /> : <CheckIcon source={require('@/assets/icons/unCheck.png')} />}
              </CourseItem>
              {postCreateData.courseId === `${course.id}` && <Input onChangeText={(text) => setText(text)} placeholder='메모를 작성해보세요' placeholderTextColor='#DDDDDD' />}
            </View>
          );
        })}
      </CourseList>
      <Buttons.LongBtn text='코스 선택 완료' onPress={() => handleSave()} disabled={false} />
    </CourseSlideDesign>
  );
};

export default CourseChoiceSlide;
