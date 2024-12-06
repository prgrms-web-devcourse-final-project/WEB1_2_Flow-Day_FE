import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import usePostCreateStore from '@/store/post/post-create-store';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';

const PostCreateImages = () => {
  const {postCreateData, setPostCreateData} = usePostCreateStore();
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const handlePostImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const newImage = result.assets[0];
      setImages([...images, newImage]);
      setPostCreateData({
        ...postCreateData,
        images: [...postCreateData.images, newImage.uri],
      });
    }
  };

  const handleImageDelete = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setPostCreateData({
      ...postCreateData,
      images: newImages.map((img) => img.uri),
    });
  };

  return (
    <ContetnsInputDesign>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ImageList>
          {images.map((img, i) => {
            return (
              <ImageTouch key={i} onPress={() => handleImageDelete(i)}>
                <ImageItem source={{uri: img.uri}} />
              </ImageTouch>
            );
          })}
        </ImageList>
      </ScrollView>
      <ImageAddButton onPress={handlePostImage}>
        <ButtonText>사진추가</ButtonText>
      </ImageAddButton>
    </ContetnsInputDesign>
  );
};

export default PostCreateImages;

const ContetnsInputDesign = styled.View`
  width: 370px;
  margin: 10px auto;
`;

const ImageList = styled.View`
  flex-direction: row;
`;

const ImageTouch = styled.TouchableOpacity``;

const ImageItem = styled.Image`
  width: 70px;
  height: 70px;
  margin-right: 10px;
`;

const ImageAddButton = styled.TouchableOpacity`
  width: 70px;
  height: 30px;
  background-color: #ffeadd;
  margin-left: auto;
  border-radius: 6px;
`;

const ButtonText = styled.Text`
  text-align: center;
  margin: auto;
`;
