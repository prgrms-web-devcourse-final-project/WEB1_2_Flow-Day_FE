import Buttons from "@/components/Buttons";
import apiClient from "@/utils/apiClient";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { useStore } from "@/store/useStore";

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

const MidText = styled.Text`
    font-family: 'SCDream5';
    font-size: 16px;
`

const Input = styled.TextInput`
    border: 1px solid #DDDDDD;
    width: 300px;
    margin: 14px 0;
    border-radius: 6px;
    font-family: 'SCDream4';
    padding: 9px 12px;
`

const Icon = styled.Image`
    width: 23px;
    height: 23px;
    margin-right: 10px;
`

const CheckBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const CheckText = styled.Text`
    font-family: 'SCDream5';
    font-size: 12px;
    width: 300px;
`;

const CheckBoxContainer = styled.View`
    width: 100%;
    justify-content: center;
`;

const CheckQuit = () => {
    const [name, setName] = useState('');
    const [pw, setPw] = useState('');
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);

    const { logOut } = useStore();

    const getInfo = async () => {
        try {
            const response = await apiClient.get('/members/');
            console.log(response.data);
            setName(response.data.name);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleQuit = async () => {
        if( !pw || !check1 || !check2 || !check3) {
            alert('모든 항목을 입력해주세요');
            return;
        }

        try {
            const response = await apiClient.delete('/members/');
            console.log(response.data);
            logOut();
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);
    return(
        <Container>
            <View style={{ width: 300 }}>
                <Textbox>
                    <TopText color="#FCAEAE">비밀번호</TopText>
                    <TopText>를 재입력하여</TopText>
                </Textbox>
                <TopText>회원 탈퇴를 진행해주세요</TopText>
            </View>
            <MidText>탈퇴 닉네임 : {name}</MidText>

            <View>
                <Input 
                    value={pw}
                    onChangeText={(text) => setPw(text)}
                    placeholder="비밀번호 입력"
                    placeholderTextColor='#DDDDDD'
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <Icon source={require('../../assets/icons/warn.png')}/>
                <MidText>탈퇴 전 확인사항</MidText>
            </View>
            <CheckBoxContainer>
            <CheckBox onPress={() => setCheck1((prev) => !prev)}>
                <Icon source={check1 ? require('../../assets/icons/checkedBox.png') : require('../../assets/icons/checkBox.png')} />
                <CheckText>더이상 해당 아이디로 로그인은 불가능해요(재가입 필요)</CheckText>
            </CheckBox>
            <CheckBox onPress={() => setCheck2((prev) => !prev)}>
                <Icon source={check2 ? require('../../assets/icons/checkedBox.png') : require('../../assets/icons/checkBox.png')} />
                <CheckText>해당 아이디로 작성된 게시글은 삭제됩니다</CheckText>
            </CheckBox>
            <CheckBox onPress={() => setCheck3((prev) => !prev)}>
                <Icon source={check3 ? require('../../assets/icons/checkedBox.png') : require('../../assets/icons/checkBox.png')} />
                <CheckText>해당 아이디로 작성된 코스는 삭제됩니다</CheckText>
            </CheckBox>
       </CheckBoxContainer>
            <Buttons.ShortBtn text="회원탈퇴 완료" onPress={handleQuit}/>
        </Container>
    )
}

export default CheckQuit;
