import React, { useRef, useState } from 'react';
import { Modal, PanResponder, Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';

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

const WishList = styled.View`
  padding: 20px;
`;

const WishListTitle = styled.Text`
  font-size: 15px;
  font-family: 'SCDream5';
  margin-bottom: 10px;
`;


// 모달 스타일
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
          <CreateButton onPress={() => setModalVisible(true)}>
            <CreateText>새 코스 생성</CreateText>
            <SvgXml xml={svg.plusCircle} width={20} height={20} />
          </CreateButton>
        </Header>
        <Content>
          <WishList>
            <WishListTitle>나의 위시리스트</WishListTitle>
        
          </WishList>
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
            <ModalTitle>새 코스 생성</ModalTitle>
            <Input
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
            />
            <ColorContainer>
              {colors.map(color => (
                <ColorButton
                  key={color}
                  color={color}
                  selected={color === selectedColor}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </ColorContainer>
            <CheckboxContainer onPress={() => setIsShared(!isShared)}>
              <View style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: '#666',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {isShared && <Text>✓</Text>}
              </View>
              <CheckboxLabel>연인과 코스 공유하기</CheckboxLabel>
            </CheckboxContainer>
            <ButtonContainer>
              <Button onPress={() => setModalVisible(false)}>
                <ButtonText>취소</ButtonText>
              </Button>
              <Button onPress={() => {
            
                setModalVisible(false);
              }}>
                <ButtonText>추가</ButtonText>
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};