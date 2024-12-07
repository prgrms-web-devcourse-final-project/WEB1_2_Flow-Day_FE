import { Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import usePostDetailStore from '@/store/post/post-detail-store';

const PostDetailImages = () => {
  const { postDetailData } = usePostDetailStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지 배열의 길이가 5개 미만이라면 부족한 부분을 noImage로 채워주는 로직
  const images = postDetailData.images || [];
  const imageCount = images.length;

  // 5개가 될 때까지 noImage를 채운 배열
  const imageArray = [
    ...images,
    ...Array(5 - imageCount).fill({ url: 'noImage' }), // 부족한 부분을 noImage로 채운다
  ];

  // 이미지 클릭 시 모달을 열고 해당 이미지를 설정하는 함수
  const handleImageClick = imageUrl => {
    if (imageUrl !== 'noImage') {
      setSelectedImage(imageUrl); // 클릭된 이미지의 URL을 상태에 저장
      setIsModalVisible(true); // 모달을 열기
    }
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null); // 모달을 닫으면 선택된 이미지를 초기화
  };

  return (
    <React.Fragment>
      <ScrollImages horizontal showsHorizontalScrollIndicator={false}>
        <ImageList>
          {imageArray.map((img, index) => (
            <ImageTouch key={index} onPress={() => handleImageClick(img.url)}>
              <ImageItem
                source={
                  img.url === 'noImage'
                    ? require('../../../assets/images/noImage.png')
                    : { uri: img.url }
                }
              />
            </ImageTouch>
          ))}
        </ImageList>
      </ScrollImages>

      {/* 모달 컴포넌트 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <ModalContainer>
          <ModalImage
            source={
              selectedImage
                ? { uri: selectedImage }
                : require('../../../assets/images/noImage.png')
            }
          />
          <CloseButton onPress={closeModal}>
            <CloseButtonText>Close</CloseButtonText>
          </CloseButton>
        </ModalContainer>
      </Modal>
    </React.Fragment>
  );
};

export default PostDetailImages;

const ScrollImages = styled.ScrollView`
  width: 370px;
  height: 80px;
  margin: 10px auto;
`;

const ImageList = styled.View`
  flex-direction: row;
`;

const ImageTouch = styled.TouchableOpacity``;

const ImageItem = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  border: 1px solid #eeeeee;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* 반투명 배경 */
`;

const ModalImage = styled.Image`
  width: 100%;
  height: 80%;
  resize-mode: contain;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  right: 20px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
`;

const CloseButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
