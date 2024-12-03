import { useRef, useState, useEffect } from 'react';
import { Modal, PanResponder, Dimensions, View, Text, Alert, TouchableOpacity, GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { courseApi } from '@/api/courseApi';
import { Course, CreateCourseRequest } from '@/types/course';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const HEADER_HEIGHT = 60;
const MINIMAL_VISIBLE_HEIGHT = 77; // 슬라이드가 내려갔을 때 보일 높이
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
  height: ${props => Math.max(props.height, MINIMAL_VISIBLE_HEIGHT)}px;
  elevation: 5;
`;

const Header = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`;

const HeaderContent = styled.View`
  height: ${HEADER_HEIGHT}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;


const HeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SCDream4';
`;

const DragIndicator = styled.View`
  width: 30px;
  height: 2px;
  background-color: #E0E0E0;
  border-radius: 2px;
  margin: 8px auto;
`;

const CreateButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  flex-direction: row;
  align-items: center;
`;


const CreateText = styled.Text`
  font-size: 10px;
  margin-left: 4px;
  font-family: 'SCDream4';
  color: #666666;
  
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
  font-size: 14px;
  font-family: 'SCDream5';
  margin-bottom: 20px;
  text-align: center;
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
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: ${props => props.color};
  border-width: ${props => props.selected ? 2 : 0}px;
  border-color: #000;
  margin: 0 auto;
`;

const CheckboxContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 8px;
  font-family: 'SCDream4';
  font-size: 13px;
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

const MoreButton = styled.TouchableOpacity`
  padding: 8px;
  margin-left: auto;
`;

const ActionMenu = styled.View`
  position: absolute;
  background-color: white;
  border-radius: 8px;
  elevation: 4;
`;

const ActionMenuItem = styled.TouchableOpacity`
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`;

const ActionMenuText = styled.Text<{ color?: string }>`
  font-size: 14px;
  color: ${props => props.color || '#000000'};
  font-family: 'SCDream4';
  text-align: center;
`;

const colors = ['#FF0004', '#FFA100', '#FFE500', '#26FF00', '#00A1FF', '#001AFF', '#8400FF','#FF69B4'];

export const CourseList = () => {
  const [slideHeight, setSlideHeight] = useState(HEADER_HEIGHT);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isShared, setIsShared] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  
  const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJsb2dpbklkIjoidGVzdCIsImlkIjoxLCJyb2xlIjoiUk9MRV9VU0VSIn0sImlhdCI6MTczMzIwNDg0MywiZXhwIjoxNzMzMjQwODQzfQ.A0wT19zaUB7pcL4ruq0lm1ESFSjZJ353KFadv_DOTQg";

  useEffect(() => {
    setSlideHeight(MINIMAL_VISIBLE_HEIGHT);
    loadCourses();
  }, []);

  const resetModalState = () => {
    setTitle('');
    setSelectedColor(colors[0]);
    setIsShared(false);
    setIsEditing(false);
    setSelectedCourse(null);
  };

  const handleMorePress = (course: Course, event: GestureResponderEvent) => {
    // 터치한 위치의 좌표 가져오기
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setSelectedCourse(course);
    setMenuVisible(true);
  };

  const handleEditPress = () => {
    if (selectedCourse) {
      setTitle(selectedCourse.title || '');
      setSelectedColor(selectedCourse.color || colors[0]);
      setIsShared(selectedCourse.status === 'COUPLE');
      setIsEditing(true);
      setModalVisible(true);
    }
    // setActionSheetVisible(false);
  };

  const handleDeletePress = async () => {
    if (!selectedCourse) return;
  
    Alert.alert(
      '코스 삭제',
      '정말로 이 코스를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await courseApi.deleteCourse(selectedCourse.id, token);
              
              setCourses(prev => prev.filter(course => course.id !== selectedCourse.id));
              // setActionSheetVisible(false);
              Alert.alert('성공', '코스가 삭제되었습니다.');
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : '삭제 실패';
          
              if (errorMessage.includes('로그인') || errorMessage.includes('인증')) {
          
                Alert.alert('알림', errorMessage, [
                  {
                    text: '확인',
                    onPress: () => {
                   
                    }
                  }
                ]);
                return;
              }
              
              Alert.alert('오류', errorMessage);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

const loadCourses = async () => {
  try {
    setLoading(true);
    setError(null);
    
    console.log('코스 목록 로드 시작');
    const response = await courseApi.getCourses(token);
    console.log('받아온 코스 목록:', response.content);
    
    if (response.content && Array.isArray(response.content)) {
      setCourses(response.content);
      console.log('코스 목록 업데이트 완료');
    } else {
      throw new Error('유효하지 않은 데이터 형식입니다.');
    }
  } catch (error) {
    console.error('코스 목록 로드 실패:', error);
    setError(error instanceof Error ? error.message : '코스 목록을 불러오는데 실패했습니다.');
    Alert.alert('오류', error instanceof Error ? error.message : '코스 목록을 불러오는데 실패했습니다.');
  } finally {
    setLoading(false);
  }
};

  const handleCreateOrUpdateCourse = async () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
  
    try {
      setLoading(true);
      setError(null);
  
      const courseData: CreateCourseRequest = {
        title: title.trim(),
        status: isShared ? 'COUPLE' : 'PRIVATE',
        date: new Date().toISOString().split('T')[0],
        color: selectedColor
      };
  
      if (isEditing && selectedCourse) {
        await courseApi.updateCourse(selectedCourse.id, courseData, token);
        Alert.alert('성공', '코스가 수정되었습니다.');
      } else {
        await courseApi.createCourse(1, courseData, token);
        Alert.alert('성공', '새로운 코스가 추가되었습니다.');
      }
  
      setModalVisible(false);
      resetModalState();
      await loadCourses();
    } catch (error) {
      const action = isEditing ? '수정' : '생성';
      setError(error instanceof Error ? error.message : `코스 ${action}에 실패했습니다.`);
      Alert.alert('오류', error instanceof Error ? error.message : `코스 ${action}에 실패했습니다.`);
    } finally {
      setLoading(false);
    }
  };

 
  const renderCourseItem = (course: Course) => (
    <CourseItem key={course.id}>
      <CourseColor color={course.color || '#666666'} />
      <CourseTitle>
        {course.title || (course.spots && course.spots.length > 0 ? course.spots[0].name : '제목 없음')}
      </CourseTitle>
      <MoreButton onPress={(event) => handleMorePress(course, event)}>
        <SvgXml xml={svg.more} width={20} height={20} />
      </MoreButton>
    </CourseItem>
  );


  const getModalTitle = () => {
    return isEditing ? '코스 수정' : '새코스 생성';
  };

  const panResponder = useRef(
    PanResponder.create({

      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dy, moveY } = gestureState;
        return Math.abs(dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight >= MINIMAL_VISIBLE_HEIGHT && newHeight < FULL_HEIGHT) {
          setSlideHeight(newHeight);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const newHeight = SCREEN_HEIGHT - gestureState.moveY;
        if (newHeight < HEADER_HEIGHT + 50) {
          setSlideHeight(MINIMAL_VISIBLE_HEIGHT);
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
          <DragIndicator />
          <HeaderContent>
          <HeaderTitle>전체 리스트</HeaderTitle>
            <CreateButton onPress={() => setModalVisible(true)}>
              <SvgXml xml={svg.plusCircle} width={20} height={20} />
              <CreateText>새코스 생성</CreateText>
            </CreateButton>
          </HeaderContent>
        </Header>
          <Content>
              {loading ? (
                <View style={{ padding: 16 }}>
                  <Text style={{ textAlign: 'center', color: '#666' }}>로딩 중...</Text>
                </View>
              ) : error ? (
                <View style={{ padding: 16 }}>
                  <Text style={{ textAlign: 'center', color: 'red' }}>{error}</Text>
                </View>
              ) : courses && courses.length > 0 ? (
                courses.map(renderCourseItem)
              ) : (
                <View style={{ padding: 16 }}>
                  <Text style={{ textAlign: 'center', color: '#666' }}>
                    코스가 없습니다.
                  </Text>
                </View>
              )}
        </Content>
      </SlideContainer>

    {menuVisible && (
      <>
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent'
          }}
          onPress={() => setMenuVisible(false)}
        />
        <ActionMenu
          style={{
            position: 'absolute',
            top: menuPosition.y,
            right: 20, 
            width: 80 
          }}
        >
          <ActionMenuItem onPress={() => {
            setMenuVisible(false);
            handleEditPress();
          }}>
            <ActionMenuText>수정</ActionMenuText>
          </ActionMenuItem>
          <ActionMenuItem onPress={() => {
            setMenuVisible(false);
            handleDeletePress();
          }}>
            <ActionMenuText color="#FF0000">삭제</ActionMenuText>
          </ActionMenuItem>
        </ActionMenu>
      </>
    )}

      <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
            setIsEditing(false);
            setTitle('');
            setSelectedColor(colors[0]);
            setIsShared(false);
          }}
        >
          <ModalContainer>
            <ModalContent>
              <ModalTitle>{getModalTitle()}</ModalTitle>
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
                <Button onPress={() => {
                  setModalVisible(false);
                  setIsEditing(false);
                  setTitle('');
                  setSelectedColor(colors[0]);
                  setIsShared(false);
                }} disabled={loading}>
                  <ButtonText>취소</ButtonText>
                </Button>
                <Button onPress={handleCreateOrUpdateCourse} disabled={loading}>
                  <ButtonText>{loading ? '처리 중...' : isEditing ? '수정' : '추가'}</ButtonText>
                </Button>
              </ButtonContainer>
            </ModalContent>
          </ModalContainer>
      </Modal>
              
    </>
  );
}; 