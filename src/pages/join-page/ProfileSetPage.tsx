import {Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';

import apiClient from '@/utils/apiClient';
import {ROUTES} from '@/constants/routes';
import Buttons from '@/components/Buttons';
import {useStore} from '@/store/useStore';
import axios from 'axios';
import {REACT_APP_SERVER_URL} from '@env';
// import { request } from "axios";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

const TopText = styled.Text<{color?: string}>`
  font-family: 'SCDream5';
  font-size: 24px;
  color: ${(props) => props.color || '#000000'};
`;

const Textbox = styled.View`
  flex-direction: row;
`;

const SubText = styled.Text`
  font-family: 'SCDream5';
  font-size: 13px;
  color: #dddddd;
`;

const ProfileBox = styled.View`
  padding-top: 30px;
`;

const Label = styled.Text`
  font-family: 'SCDream5';
  font-size: 12px;
  width: 70px;
`;

const Input = styled.TextInput`
  border: 1px solid #dddddd;
  width: 300px;
  margin: 14px 0;
  border-radius: 6px;
  font-family: 'SCDream4';
  padding: 9px 12px;
`;

const ImageBox = styled.View`
  align-items: center;
  padding: 30px 0;
`;

const InputBox = styled.View`
  padding: 20px 0;
`;

const ProfileSetPage = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>();

  const {accessToken} = useStore.getState();

  const navigation = useNavigation();

  const handlePostImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handlesetProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('birthDt', date);

      if (image) {
        const photo = {
          uri: image.uri,
          type: 'image/png',
          name: `image.png`,
        };
        formData.append('file', photo as any);
      } else {
        const photo = {
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAADjI6ACAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG3ElEQVR4nOzUwQkAMAwEsO//62OAQlUR',
          type: 'image/png',
          name: `image.png`,
        };
        formData.append('file', photo as any);

      }

      const response = await axios.put(`${REACT_APP_SERVER_URL}/members/myInfo`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'multipart/form-data',
        },
      });
      navigation.navigate(ROUTES.COUPLE_REGISTER as never);

      console.log(response.data);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Container>
      <View style={{width: 300}}>
        <Textbox>
          <TopText color='#FCAEAE'>프로필 사진</TopText>
          <TopText>과 </TopText>
          <TopText color='#FCAEAE'>닉네임</TopText>
          <TopText>을</TopText>
        </Textbox>
        <TopText>입력해주세요</TopText>
        <SubText>프로필 사진을 입력 하지 않을 경우</SubText>
        <SubText>기본 이미지가 표시됩니다.</SubText>
      </View>
      <ProfileBox>
        <Label>프로필 사진</Label>
        <ImageBox>
          <Image source={require('../../assets/images/profile-icon.png')} />
        </ImageBox>
        <Buttons.ShortBtn text='이미지 업로드' style={{backgroundColor: '#000000'}} onPress={handlePostImage} />
      </ProfileBox>
      <InputBox>
        <Label>닉네임</Label>
        <Input value={name} onChangeText={(text) => setName(text)} placeholder='닉네임' placeholderTextColor='#DDDDDD' />
        <Label>생년월일</Label>
        <Input value={date} onChangeText={(text) => setDate(text)} placeholder='8자리입력 ex)19990101' placeholderTextColor='#DDDDDD' />
      </InputBox>
      <Buttons.ShortBtn text='다음 단계로' onPress={handlesetProfile} />
    </Container>
  );
};

export default ProfileSetPage;
