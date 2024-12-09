import Buttons from "@/components/Buttons";
import { ROUTES } from "@/constants/routes";
import { useStore } from "@/store/useStore";
import apiClient from "@/utils/apiClient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    padding: 70px 50px 100px;
    justify-content: space-between;
    background-color: #FFFFFF;
`

const TopText = styled.Text<{ color?: string }>`
    font-family: 'SCDream5';
    font-size: 24px;
    color: ${(props) => props.color || '#000000'};
`

const Textbox = styled.View`
    flex-direction: row;
`

const SubText = styled.Text`
    font-family: 'SCDream5';
    font-size: 13px;
    color: #DDDDDD;
`

const Input = styled.TextInput`
    border: 1px solid #DDDDDD;
    width: 300px;
    margin: 25px 0;
    border-radius: 6px;
    font-family: 'SCDream4';
    padding: 9px 12px;
`

const Message = styled.Text`
    color: #FF6666;
    font-size: 10px;
    font-family: 'SCDream4';
`

const CoupleRegisterPage = () => {
    const [name, setName] = useState<string>();
    const [message, setMessage] = useState<string>();
    const navigation = useNavigation();
    const {accessToken} = useStore();
    console.log(accessToken);

    const handleFind = async () => {
        try{
            const response = await apiClient.get(`/members/partner/${name}`);
            console.log(response.data)

            const res = await apiClient.get('/members/');
            const res2 = await apiClient.get(`/members/partner/${res.data.name}`);
            
            console.log(res2.data)
            if (response.data.id === null) {
                setMessage('정확한 닉네임을 입력해주세요');
            } else {
                navigation.navigate(ROUTES.COUPLE_CHECK, {
                    myId: res2.data.Id,
                    name: response.data.name,
                    image: response.data.profileImage,
                    id: response.data.id
                });
            }
        } catch(error) {
            console.error('Error: ', error);
        }  
    }

    return(
        <Container>
            <View>
                <Textbox>
                    <TopText>먼저 가입한 </TopText><TopText color="#FCAEAE">연인</TopText><TopText>이 있다면</TopText>
                </Textbox>
                <Textbox>
                    <TopText color="#FCAEAE">커플</TopText><TopText>로 추가해주세요</TopText>
                </Textbox>
                <SubText>없을 경우 '넘어가기 버튼'을 클릭하여</SubText>
                <SubText>회원가입을 완료해주세요</SubText>
            </View>
            <View>
                <Input 
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="닉네임"
                    placeholderTextColor='#DDDDDD'
                />
                <Message>{message}</Message>
                <Buttons.ShortBtn text="연인 닉네임 조회" style={{backgroundColor: '#000000'}} onPress={() => handleFind()}/>
            </View>
            <Buttons.ShortBtn text="넘어가기" onPress={() => navigation.navigate(ROUTES.WELCOME as never)}/>
        </Container>
    )
    
}

export default CoupleRegisterPage;
