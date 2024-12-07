import { Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import Buttons from "@/components/Buttons";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

const Container = styled.View`
    flex: 1;
    background-color: #FFFFFF;
    align-items: center;
    justify-content: center;
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

const ProfileBox = styled.View`
    padding-top: 30px;
`

const Label = styled.Text`
    font-family: 'SCDream5';
    font-size: 12px;
    width: 70px;
`

const Input = styled.TextInput`
    border: 1px solid #DDDDDD;
    width: 300px;
    margin: 14px 0;
    border-radius: 6px;
    font-family: 'SCDream4';
    padding: 9px 12px;
`

const ImageBox = styled.View`
    align-items: center;
    padding: 30px 0;
`

const InputBox = styled.View`
    padding: 20px 0;
`

const ProfileSetPage = () => {
    const [name, setName] = useState<string>();
    const [date, setDate] = useState<string>();

    const navigation = useNavigation();

    return(
        <Container>
            <View style={{ width: 300 }}>
                <Textbox>
                    <TopText color="#FCAEAE">프로필 사진</TopText><TopText>과 </TopText>
                    <TopText color="#FCAEAE">닉네임</TopText><TopText>을</TopText>
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
                <Buttons.ShortBtn text="이미지 업로드" style={{ backgroundColor: '#000000'}}/>
            </ProfileBox>
            <InputBox>
                <Label>닉네임</Label>
                <Input 
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="닉네임"
                    placeholderTextColor='#DDDDDD'
                />
                <Label>생년월일</Label>
                <Input 
                    value={date}
                    onChangeText={(text) => setDate(text)}
                    placeholder="8자리입력 ex)19990101"
                    placeholderTextColor='#DDDDDD'
                />
            </InputBox>
            <Buttons.ShortBtn text="다음 단계로" onPress={() => navigation.navigate(ROUTES.COUPLE_REGISTER as never)}/>
        </Container>
    )
}

export default ProfileSetPage;