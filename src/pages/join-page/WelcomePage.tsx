import { Image, View } from "react-native";
import styled from "styled-components/native";

import Buttons from "@/components/Buttons";
import { useStore } from "@/store/useStore";
import apiClient from "@/utils/apiClient";
import { useEffect, useState } from "react";

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

const ImageBox = styled.View`
    align-items: center;
`

const WelcomePage = () => {
    const { setIsLoggedIn } = useStore();
    const [name, setName] = useState();

    const handleMove = () => {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        const getName = async () => {
            try {
                const response = await apiClient.get('/members/');
                setName(response.data.name);
            } catch (error) {
                console.error('Error: ', error);
            }
        }
        getName();
    }, []);

    return(
        <Container>
            <View>
                <TopText>{name}님</TopText>
                <Textbox>
                    <TopText color="#FCAEAE">플로우데이</TopText><TopText>에 오신것을</TopText>
                </Textbox>
                <TopText>진심으로 환영합니다!</TopText>
                <View style={{ paddingVertical: 13 }}>
                    <SubText>'메인화면으로 이동' 버튼을 클릭하여</SubText>
                    <SubText>플로우데이를 시작하세요!</SubText>
                </View>
            </View>
            <ImageBox>
                <Image source={require('../../assets/logo.png')}/>
            </ImageBox>
            <View>
                <Buttons.ShortBtn text="홈으로 이동" onPress={() => handleMove()}/>
            </View>
        </Container>
    )
}

export default WelcomePage;
