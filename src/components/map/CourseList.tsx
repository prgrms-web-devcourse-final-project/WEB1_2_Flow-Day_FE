import React, { useRef, useState, useEffect } from 'react';
import { Modal, PanResponder, Dimensions, View, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { courseApi } from '@/api/courseApi';
import { Course, CreateCourseRequest } from '@/types/course';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HEADER_HEIGHT = 60;
const HALF_HEIGHT = SCREEN_HEIGHT * 0.5;
const FULL_HEIGHT = SCREEN_HEIGHT * 0.8;

const SlideContainer = styled.View<{ height: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: ${props => props.height}px;
  elevation: 5;
`;

const Header = styled.View`
  height: ${HEADER_HEIGHT}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SCDream4';
`;

const CreateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CreateText = styled.Text`
  font-size: 14px;
  margin-right: 4px;
  font-family: 'SCDream4';
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const CourseItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`;

const CourseColor = styled.View<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${props => props.color};
  margin-right: 12px;
`;

const CourseTitle = styled.Text`
  font-size: 15px;
  font-family: 'SCDream4';
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-family: 'SCDream5';
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #EEEEEE;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  font-family: 'SCDream4';
`;

const ColorContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const ColorButton = styled.TouchableOpacity<{ color: string; selected: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.color};
  margin: 5px;
  border-width: ${props => props.selected ? 2 : 0}px;
  border-color: #000;
`;

const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 8px;
  font-family: 'SCDream4';
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  margin-left: 10px;
`;

const ButtonText = styled.Text`
  color: #FF6666;
  font-family: 'SCDream4';
`;


const colors = ['#FF6666', '#FFB966', '#FFE166', '#66FF66', '#66FFFF', '#6666FF', '#FF66FF'];

export const CourseList = () => {
  const [slideHeight, setSlideHeight] = useState(HEADER_HEIGHT);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isShared, setIsShared] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoxLCJsb2dpbklkIjoidGVzdCIsImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIn0sImlhdCI6MTczMzEwNzQ1MywiZXhwIjoxNzMzMTExMDUzfQ.g5yV1LyJeO1zWPWn9Fw8rpNAiVujcZlFUbfvyOVShzs";
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const coursesData = await courseApi.getCourses(token);
      
      console.log('API Response:', coursesData); // 응답 데이터 확인용 로그
      
      // 응답 데이터가 배열인지 확인
      if (!Array.isArray(coursesData)) {
        console.error('Unexpected API response:', coursesData);
        throw new Error('서버로부터 잘못된 데이터 형식을 받았습니다.');
      }
      
      setCourses(coursesData);
    } catch (error) {
      setError(error instanceof Error ? error.message : '코스 목록을 불러오는데 실패했습니다.');
      Alert.alert('오류', error instanceof Error ? error.message : '코스 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newCourse: CreateCourseRequest = {
        title: title.trim(),
        status: isShared ? 'PUBLIC' : 'PRIVATE',
        date: new Date().toISOString().split('T')[0],
        color: selectedColor
      };

      await courseApi.createCourse(newCourse, token);
      setModalVisible(false);
      await loadCourses();
      
      // 입력값 초기화
      setTitle('');
      setSelectedColor(colors[0]);
      setIsShared(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : '코스 생성에 실패했습니다.');
      Alert.alert('오류', error instanceof Error ? error.message : '코스 생성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight > HEADER_HEIGHT && newHeight < FULL_HEIGHT) {
          setSlideHeight(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight < HEADER_HEIGHT + 50) {
          setSlideHeight(HEADER_HEIGHT);
        } else if (newHeight < HALF_HEIGHT + 50) {
          setSlideHeight(HALF_HEIGHT);
        } else {
          setSlideHeight(FULL_HEIGHT);
        }
      },
    })
  ).current;

  return (
    <>
      <SlideContainer height={slideHeight} {...panResponder.panHandlers}>
        <Header>
          <HeaderTitle>전체 리스트</HeaderTitle>
          <CreateButton onPress={() => setModalVisible(true)} disabled={loading}>
            <CreateText>새코스 생성</CreateText>
            <SvgXml xml={svg.plusCircle} width={20} height={20} />
          </CreateButton>
        </Header>
        <Content>
        {loading ? (
            <View style={{ padding: 16 }}>
              <Text style={{ textAlign: 'center', color: '#666' }}>
                로딩 중...
              </Text>
            </View>
          ) : error ? (
            <View style={{ padding: 16 }}>
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {error}
              </Text>
            </View>
          ) : courses && Array.isArray(courses) && courses.length > 0 ? (  // courses가 존재하고 배열인지 확인
            courses.map((course) => (
              <CourseItem key={course.id}>
                <CourseColor color={course.color} />
                <CourseTitle>{course.title}</CourseTitle>
              </CourseItem>
            ))
          ) : (
            <View style={{ padding: 16 }}>
              <Text style={{ textAlign: 'center', color: '#666' }}>
                코스가 없습니다.
              </Text>
            </View>
          )}
        </Content>
      </SlideContainer>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>새코스 생성</ModalTitle>
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
              editable={!loading}
            />
            <ColorContainer>
              {colors.map(color => (
                <ColorButton
                  key={color}
                  color={color}
                  selected={color === selectedColor}
                  onPress={() => setSelectedColor(color)}
                  disabled={loading}
                />
              ))}
            </ColorContainer>
            <CheckboxContainer onPress={() => !loading && setIsShared(!isShared)}>
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: '#666',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {isShared && <Text style={{ color: '#666' }}>✓</Text>}
              </View>
              <CheckboxLabel>연인과 코스 공유하기</CheckboxLabel>
            </CheckboxContainer>
            <ButtonContainer>
              <Button onPress={() => setModalVisible(false)} disabled={loading}>
                <ButtonText>취소</ButtonText>
              </Button>
              <Button onPress={handleCreateCourse} disabled={loading}>
                <ButtonText>{loading ? '처리 중...' : '추가'}</ButtonText>
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};