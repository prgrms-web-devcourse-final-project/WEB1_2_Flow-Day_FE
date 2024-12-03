import { Text, View } from "react-native"
import styled from 'styled-components/native';
import { useState } from "react";
import Buttons from "@/components/Buttons";

const Container = styled.View`
    padding: 70px 50px 100px;
    padding-top: 70px;
    flex: 1;
    background-color: #FFFFFF;
    align-items: center;
    justify-content: space-between;
`

const TopText = styled.Text<{ color?: string }>`
    font-family: 'SCDream5';
    font-size: 24px;
    color: ${(props) => props.color || '#000000'};
`

const Textbox = styled.View`
    flex-direction: row;
    width: 100%;
`

const SubText = styled.Text`
    font-family: 'SCDream5';
    font-size: 13px;
    color: #DDDDDD;
`

const Input = styled.TextInput`
    border: 1px solid #DDDDDD;
    width: 300px;
    margin: 14px 0;
    border-radius: 6px;
    font-family: 'SCDream4';
    padding: 9px 12px;
`

const JoinPage = () => {
    const [id, setId] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [pw, setPw] = useState<string>();
    const [pwCheck, setPwCheck] = useState<string>();

    return(
        <Container>
            <View style={{ width: 300}}>
                <TopText>안녕하세요</TopText>
                <Textbox>
                    <TopText color="#FCAEAE">플로우데이</TopText>
                    <TopText>입니다{`:)`}</TopText>
                </Textbox>
                <SubText>회원정보를 입력하여 플로우데이와 함께 </SubText>
                <SubText>연인과 행복한 하루를 만들어보세요!</SubText>
            </View>
            <View>
                <Text>기본정보</Text>
                <Input 
                    value={id}
                    onChangeText={(text) => setId(text)}
                    placeholder="아이디 입력"
                    placeholderTextColor='#DDDDDD'
                />
                <Input 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="이메일 입력"
                    placeholderTextColor='#DDDDDD'
                />
                <Input 
                    value={pw}
                    onChangeText={(text) => setPw(text)}
                    placeholder="비밀번호 입력"
                    placeholderTextColor='#DDDDDD'
                />
                    <Input 
                    value={pwCheck}
                    onChangeText={(text) => setPwCheck(text)}
                    placeholder="비밀번호 확인"
                    placeholderTextColor='#DDDDDD'
                />
            </View>
            <Buttons.ShortBtn text="다음 단계로" />
        </Container>
        
    )

}

export default JoinPage