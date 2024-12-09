import Buttons from '@/components/Buttons';
import {ROUTES} from '@/constants/routes';
import {useStore} from '@/store/useStore';
import apiClient from '@/utils/apiClient';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 70px 50px;
  justify-content: space-between;
  background-color: #ffffff;
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

const Input = styled.TextInput`
  border: 1px solid #dddddd;
  width: 300px;
  margin: 25px 0;
  border-radius: 6px;
  font-family: 'SCDream4';
  padding: 9px 12px;
`;

const Image = styled.Image`
  width: 187px;
  height: 187px;
  border-radius: 187px;
  justify-content: center;
  margin: 20px 0;
  background-color: #eeeeee;
`;

const Name = styled.Text`
  font-size: 36px;
  font-family: 'SCDream5';
  text-align: center;
`;

const Label = styled.Text`
  font-family: 'SCDream5';
  font-size: 12px;
  width: 70px;
`;

const Button = styled.TouchableOpacity<{colored?: boolean}>`
  width: 118px;
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.colored ? '#000000' : '#DDDDDD')};
  margin: 0 auto;
`;

const ButtonBox = styled.View`
  flex-direction: row;
`;

const ButtonText = styled.Text<{colored?: boolean}>`
  font-family: 'SCDream6';
  color: ${(props) => (props.colored ? '#FFFFFF' : '#000000')};
`;

const CoupleApprove = ({route}: any) => {
  const [approved, setApproved] = useState(false);
  const tempData = {
    name: '도라에몽',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAADjI6ACAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG3ElEQVR4nOzUwQkAMAwEsO//62OAQlURvFaO2MGUy',
    date: '2021-09-01',
    id: 4,
  };

  const navigation = useNavigation();

  const handleApprove = async () => {
    try {
      const response = await apiClient.post(`/members/partnerUpdate`, {
        partnerId: tempData.id,
      });
      console.log(response.data);
      Alert.alert('커플 신청이 수락되었습니다.');
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <View>
        <Textbox>
          <TopText color='#FF6666'>커플</TopText>
          <TopText>신청이 왔어요</TopText>
        </Textbox>
        <View style={{paddingVertical: 10}}>
          <SubText>프로필 사진과 닉네임을 확인하여</SubText>
          <SubText>내 연인이 맞다면 커플 수락 버튼을 눌러</SubText>
          <SubText>커플을 맺어보세요!</SubText>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: tempData.image}} />
        <Name>{tempData.name}</Name>
        <TopText>{tempData.date}</TopText>
      </View>
      <ButtonBox>
        <Button colored onPress={() => handleApprove()}>
          <ButtonText colored>수락</ButtonText>
        </Button>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>거절</ButtonText>
        </Button>
      </ButtonBox>
    </Container>
  );
};

export default CoupleApprove;
