import apiClient from '@/utils/apiClient';
import { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import styled from 'styled-components/native';

const ImageButton = styled.View`
  width: 53px;
  height: 53px;
  border-radius: 53px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const ButtonText = styled.Text`
  text-align: center;
  padding-bottom: 5px;
  margin: auto 0;
  color: white;
`

const TopText = styled.Text`
  font-family: 'SCDreama';
  font-size: 20px;
`

const Container = styled.View`
  padding: 5px 12px;
  flex: 0.7;
`

const ButtonContainer = styled.TouchableOpacity`
  margin-right: 10px;
  margin-top: 10px;
`

const ImageContainer = styled.ImageBackground`
  border-radius: 53px;
  overflow: hidden;
`

const ImageBox = styled.Image`
    width: 150px;
    height: 150px;
`

const ContentBox = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

const PlaceBox = styled.View`
    width: 48%;
    margin-bottom: 10px;
    align-items: center;
`

const regions = [
  ['서울', require('../../assets/images/seoul.png')],
  ['부산', require('../../assets/images/busan.png')],
  ['대구', require('../../assets/images/daegu.png')],
  ['인천', require('../../assets/images/incheon.png')],
  ['광주', require('../../assets/images/gwangju.png')],
  ['대전', require('../../assets/images/daejeon.png')],
  ['울산', require('../../assets/images/ulsan.png')],
  ['세종', require('../../assets/images/sejong.png')],
  ['경기', require('../../assets/images/gyeonggi.png')],
  ['강원', require('../../assets/images/gangwon.png')],
  ['충북', require('../../assets/images/chungbuk.png')],
  ['충남', require('../../assets/images/chungnam.png')],
  ['전북', require('../../assets/images/jeonbuk.png')],
  ['전남', require('../../assets/images/jeonnam.png')],
  ['경북', require('../../assets/images/gyeongbuk.png')],
  ['경남', require('../../assets/images/gyeongnam.png')],
  ['제주', require('../../assets/images/jeju.png')]
]

const MainContent = () => {
    const [spots, setSpots] = useState();

    const fetchSpots = async (city: string) => {
        try {
            const response = await apiClient.get(`spots?city=${city}`);
            setSpots(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching spots:', error);
        }
    }

    useEffect(() => {
        fetchSpots('서울');
    }, [])

    return(
        <Container>
            <TopText>🔥지역별 데이트 핫플</TopText>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}>
            {
                regions.map(([name, image], index) => (
                <ButtonContainer key={index} onPress={() => fetchSpots(name)}>
                    <ImageContainer source={image}>
                    <ImageButton>
                        <ButtonText>{name}</ButtonText>
                    </ImageButton>
                    </ImageContainer>
                </ButtonContainer>
                ))
            }
            </ScrollView>
            <ContentBox>
                <PlaceBox>
                    <ImageBox source={require('../../assets/images/gyeongbuk.png')}/>
                    <Text>한국 민속촌</Text>
                </PlaceBox>
                <PlaceBox>
                    <ImageBox source={require('../../assets/images/gyeongbuk.png')}/>
                    <Text>한국 민속촌</Text>
                </PlaceBox>
                <PlaceBox>
                    <ImageBox source={require('../../assets/images/gyeongbuk.png')}/>
                    <Text>한국 민속촌</Text>
                </PlaceBox>
                <PlaceBox>
                    <ImageBox source={require('../../assets/images/gyeongbuk.png')}/>
                    <Text>한국 민속촌</Text>
                </PlaceBox>
            </ContentBox>
        </Container>

    )
}
export default MainContent;