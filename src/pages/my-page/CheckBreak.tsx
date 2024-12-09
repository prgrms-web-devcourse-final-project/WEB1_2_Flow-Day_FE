import { View, Alert } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import apiClient from "@/utils/apiClient"
import styled from "styled-components/native"

const Container = styled.View`
    flex: 1;
    padding: 70px 50px;
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

const Image = styled.Image`
    width: 187px;
    height: 187px;
    border-radius: 187px;
    justify-content: center;
    margin: 20px 0;
    background-color: #EEEEEE;
`

const Name = styled.Text`
    font-size: 36px;
    font-family: 'SCDream5';
    text-align: center;
`

const Button = styled.TouchableOpacity<{ colored?: boolean }>`
  width: 118px;
  height: 48px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.colored ? '#000000' : '#DDDDDD'};
  margin: 0 auto;
`

const ButtonBox = styled.View`
    flex-direction: row;
`

const ButtonText = styled.Text<{ colored?: boolean }>`
    font-family: 'SCDream6';
    color: ${(props) => props.colored ? '#FFFFFF' : '#000000'};
`

const CheckBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const CheckText = styled.Text`
    font-family: 'SCDream5';
    font-size: 12px;
    width: 200px;
`;

const CheckBoxContainer = styled.View`
    width: 100%;
    justify-content: center;
`;

const Icon = styled.Image`
    width: 14px;
    height: 14px;
    margin: 5px;
`;

const CheckBreak = () => {
    const [data, setData] = useState<any>();
    const navigation = useNavigation();
    const [savePost, setSavePost] = useState(false);
    const [saveCourse, setSaveCourse] = useState(false);

    const getData = async () => {
        try{
            const response = await apiClient.get(`/members/`);
            console.log(response.data)
            setData(response.data);
        } catch(error) {
            console.error('Error: ', error);
        }  
    }

    useEffect(() => {
        getData();
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await apiClient.put(`members/partnerUpdate?stat=true`);
            console.log(response.data);
            Alert.alert('연결이 끊어졌습니다.');
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return (
        <Container>
        <View>
            <Textbox>
                <TopText color="#FF6666">연인</TopText><TopText>과 커플 연결을</TopText>
            </Textbox>
            <TopText>끊으시겠어요?</TopText>
            <View style={{ paddingVertical: 10}}>
                <SubText>연결 끊기를 클릭하면 커플 연결이 끊어지고</SubText>
                <SubText>상대방에게 알림이 전송됩니다.</SubText>
            </View>

        </View>
       <View style={{alignItems: "center"}}>
            <Image source={{uri: data?.partnerImage}} />
            <Name>{data?.partnerName}</Name>
       </View>
       <CheckBoxContainer>
            <CheckBox onPress={() => setSaveCourse((prev) => !prev)}>
                <Icon source={saveCourse ? require('../../assets/icons/checkedBox.png') : require('../../assets/icons/checkBox.png')} />
                <CheckText>연인과 함께한 코스를 남겨둘까요?</CheckText>
            </CheckBox>
            <CheckBox onPress={() => setSavePost((prev) => !prev)}>
                <Icon source={savePost ? require('../../assets/icons/checkedBox.png') : require('../../assets/icons/checkBox.png')} />
                <CheckText>연인과 함께한 게시글을 남겨둘까요?</CheckText>
            </CheckBox>
       </CheckBoxContainer>
   
       
       <ButtonBox>
        <Button colored onPress={() => handleSubmit()}>
                <ButtonText colored>끊기</ButtonText>
            </Button>
        <Button onPress={() => navigation.goBack()}>
            <ButtonText>취소</ButtonText>
        </Button>
       </ButtonBox>
       
    </Container>
    )
}

export default CheckBreak;