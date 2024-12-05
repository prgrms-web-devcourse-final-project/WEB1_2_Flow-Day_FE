import Buttons from "@/components/Buttons";
import { ROUTES } from "@/constants/routes";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    
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
    margin: 14px 0;
    border-radius: 6px;
    font-family: 'SCDream4';
    padding: 9px 12px;
`

const CoupleRegisterPage = () => {
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

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
                <Buttons.ShortBtn text="연인 닉네임 조회" style={{backgroundColor: '#000000'}} />
            </View>
            <Buttons.ShortBtn text="넘어가기" onPress={() => navigation.navigate(ROUTES.WELCOME as never)}/>
        </Container>
    )
    
}

export default CoupleRegisterPage;