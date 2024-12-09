import { View, Alert } from "react-native"
import styled from "styled-components/native"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";

import apiClient from "@/utils/apiClient";

const Container = styled.View`
    flex: 1;
    padding: 20px 0;
    justify-content: space-between;
    background-color: #FFFFFF;
`;

const Image = styled.Image`
    width: 170px;
    height: 170px;
    border-radius: 170px;
    background-color: #EEEEEE;
`;

const Name  = styled.Text`
    font-family: 'SCDream5';
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
`;

const ProfileBox = styled.View`
    align-items: center ;
`;

const InfoBox = styled.View`
    align-items: center;
    justify-content: center;
`;

const InfoText = styled.Text`
    font-family: 'SCDream3';
    font-size: 16px;
    width: 300px;
`;

const Input = styled.TextInput`
  border: 1px solid #dddddd;
  width: 300px;
  height: 30px;
  margin: 10px 0;
  border-radius: 6px;
  font-family: 'SCDream4';
  padding: 0 12px;
`;

const Button = styled.TouchableOpacity`
    width: 300px;
    height: 30px;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    background-color: #FFEADD;
    margin: 3px auto;
`;

const ButtonText = styled.Text`
    color: #000000;
    font-size: 14px;
    font-family: 'SCDream3';
`;

const MyInfo = () => {
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setCheckPw] = useState('');
    const navigation = useNavigation();
    const [data, setData] = useState<any>();

    const getInfo = async () => {
        try {
            const response = await apiClient.get('/members/');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    const handleName = async () => {
        try {
            const response = await apiClient.put('/members/', {
                name: name,
            },
            {
                headers:{
                    'Content-Type': 'application/json',
                }
            });

            console.log(response.data);
            Alert.alert('닉네임이 변경되었습니다.');
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handlePw = async() => {
        try {
            if(pw !== checkPw){
                Alert.alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            Alert.alert('비밀번호가 변경되었습니다.');
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    return(
        <Container>
            <ProfileBox>
                <Image source={{uri: data?.profileImage}} />
                <Name>{data?.name}</Name>
            </ProfileBox>
            <InfoBox>
                <InfoText>닉네임 변경</InfoText>
                <Input 
                    value={name} 
                    onChangeText={(text) => setName(text)} 
                    placeholder='변경할 닉네임을 입력해주세요' 
                    placeholderTextColor='#DDDDDD'/>
                <Button onPress={() => handleName()}>
                    <ButtonText>닉네임 변경</ButtonText>
                </Button>
            </InfoBox>
            <InfoBox>
                <InfoText>비밀번호 변경</InfoText>
                <Input 
                    value={pw} 
                    onChangeText={(text) => setPw(text)} 
                    placeholder='변경할 비밀번호를 입력해주세요' 
                    placeholderTextColor='#DDDDDD'/>
                <InfoText>비밀번호 확인</InfoText>
                <Input 
                    value={checkPw} 
                    onChangeText={(text) => setCheckPw(text)} 
                    placeholder='변경할 비밀번호를 재입력해주세요' 
                    placeholderTextColor='#DDDDDD'/>
                <Button onPress={() => handlePw}>
                    <ButtonText>비밀번호 변경</ButtonText>
                </Button>
            </InfoBox>
            <View>
                <Button onPress={() => navigation.navigate('CheckBreak' as never)}>
                    <ButtonText>연인과 연결 끊기</ButtonText>
                </Button>
                <Button onPress={() => navigation.navigate('CheckQuit' as never)}>
                    <ButtonText>회원 탈퇴</ButtonText>
                </Button>
            </View>

        </Container>
    )
}

export default MyInfo;
