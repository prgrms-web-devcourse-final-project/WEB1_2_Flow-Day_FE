import axios from 'axios';
import {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import Buttons from '@/components/Buttons';
import {REACT_APP_SERVER_URL} from '@env';
import {useStore} from '@/store/useStore';
import {ROUTES} from '@/constants/routes';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  margin: auto 0;
`;

const Input = styled.TextInput`
  border: 1px solid #dddddd;
  width: 300px;
  height: 42px;
  margin: 12px 0;
  border-radius: 6px;
  font-family: 'SCDream4';
  padding: 0 12px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 300px;
  justify-content: center;
  margin: 40px 0 20px 0;
`;

const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #dddddd;
`;

const CenterText = styled.Text`
  margin: 0 10px;
  font-family: 'SCDream5';
  font-size: 14px;
  color: #dddddd;
`;

const IconContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 230px;
`;

const TextGrey = styled.Text`
  font-family: 'SCDream4';
  color: #7d7d7d;
`;

const TextColored = styled.Text`
  font-family: 'SCDream6';
  color: #ff6666;
`;

const BottomBox = styled.View`
  padding: 58px;
`;

const BottomText = styled.Text`
  padding: 5px 0;
  text-align: center;
`;

const LoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const {accessToken, setRommId, setUserId, setAccessToken, setIsLoggedIn} = useStore();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const validateInputs = () => {
    if (!id.trim()) {
      Alert.alert('입력 오류', '아이디를 입력해주세요.');
      return false;
    }
    if (!pw.trim()) {
      Alert.alert('입력 오류', '비밀번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await axios.post(`${REACT_APP_SERVER_URL}/members/login`, {
        loginId: id,
        pw: pw,
      });

      const accessToken = response.headers['authorization']?.split(' ')[1];
      const userId = response.data;
      console.log('res:', response.data);
      // console.log

      if (accessToken) {
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        setUserId(userId); // 로그인 시 유저 아이디 저장
        console.log(accessToken);
      } else {
        Alert.alert('로그인 실패', '로그인 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          Alert.alert('연결 실패', '서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
        } else if (error.response?.status === 401) {
          Alert.alert('로그인 실패', '아이디 또는 비밀번호가 올바르지 않습니다.');
        } else {
          Alert.alert('오류', '로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Image source={require('../../assets/icons/login-logo.png')} style={{marginTop: 50}} />
      <Input value={id} onChangeText={(text) => setId(text)} placeholder='아이디' placeholderTextColor='#DDDDDD' editable={!loading} />
      <Input value={pw} onChangeText={(text) => setPw(text)} placeholder='비밀번호' placeholderTextColor='#DDDDDD' secureTextEntry={true} editable={!loading} />
      <Buttons.ShortBtn text={loading ? '로그인 중...' : '로그인'} style={{marginTop: 10}} onPress={handleLogin} disabled={loading} />

      <View style={{alignItems: 'center'}}>
        <TextContainer>
          <Line />
          <CenterText>SNS계정으로 로그인</CenterText>
          <Line />
        </TextContainer>
        <IconContainer>
          <Image source={require('../../assets/icons/google.png')} />
          <Image source={require('../../assets/icons/naver.png')} />
          <Image source={require('../../assets/icons/kakao.png')} />
        </IconContainer>
      </View>

      <BottomBox>
        <BottomText style={{width: '100%'}}>
          <TextGrey>아직 플로우데이 계정이 없으신가요? </TextGrey>
          <TextColored onPress={() => navigation.navigate(ROUTES.JOIN as never)}>회원가입</TextColored>
        </BottomText>
        <BottomText>
          <TextGrey>비밀번호를 잊으셨나요? </TextGrey>
          <TextColored>비밀번호 재설정</TextColored>
        </BottomText>
      </BottomBox>
    </Container>
  );
};

export default LoginPage;
