import Buttons from "@/components/Buttons"
import { ROUTES } from "@/constants/routes"
import { useStore } from "@/store/useStore"
import apiClient from "@/utils/apiClient"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Text, View } from "react-native"
import styled from "styled-components/native"

const Container = styled.View`
    flex: 1;
    padding: 70px 50px;
    justify-content: space-between;
    background-color: #FFFFFF;
    /* align-items: center; */
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

`

const Name = styled.Text`
    font-size: 36px;
    font-family: 'SCDream5';
    text-align: center;
`

const Label = styled.Text`
    font-family: 'SCDream5';
    font-size: 12px;
    width: 70px;
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

const CoupleCheckPage = ({ route }: any) => {
    const [date, setDate] = useState<string>()
    const { name, image, id } = route.params;
    const { accessToken } = useStore.getState();

    const navigation = useNavigation();
    

    const handleSubmit = async () => {
        try{
            const response = await apiClient.put(`/members/relationship`, {
                partnerId: `${id}`,
                relationshipDt: date
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            navigation.navigate(ROUTES.WELCOME as never)

        } catch(error) {
            console.error('Error: ', error);
        }  
    }
    return(
        <Container>
            <View>
                <Textbox>
                    <TopText color="#FF6666">연인</TopText><TopText>의</TopText>
                </Textbox>
                <TopText>프로필 사진과 닉네임을</TopText>
                <TopText>확인해주세요!</TopText>
                <View style={{ paddingVertical: 10}}>
                    <SubText>내가 찾는 연인의 정보와 일치하다면 '확인' 버튼을</SubText>
                    <SubText>클릭하여 연인에게 커플수락 메세지를 보내세요</SubText>
                </View>

            </View>
           <View style={{alignItems: "center"}}>
                <Image source={require('../../assets/images/daejeon.png')} />
                <Name>{name}</Name>
           </View>
           <View style={{ paddingTop: 10}}>
            <Label>사귄날짜</Label>
            <Input 
                value={date}
                onChangeText={(text) => setDate(text)}
                placeholder="8자리 입력 ex)1999-01-01"
                placeholderTextColor='#DDDDDD'
            />
           </View>
           <ButtonBox>
            <Button colored onPress={() => handleSubmit()}>
                    <ButtonText colored>커플 신청</ButtonText>
                </Button>
            <Button onPress={() => navigation.goBack()}>
                <ButtonText>취소</ButtonText>
            </Button>
           </ButtonBox>
           
        </Container>
    )
}

export default CoupleCheckPage;
