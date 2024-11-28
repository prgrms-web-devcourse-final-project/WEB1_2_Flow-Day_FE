import { svg } from '@/assets/icons/svg';
import { View, Text, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`

const SwipeButton = styled.Text`
    width: 24px;
    font-weight: 700;
`

const TopSwiper = () => {
    const images = [
        require('../../assets/images/banner1.png'),
        require('../../assets/images/banner2.png'),
        require('../../assets/images/banner1.png'),
    ];

    return(
        <Container>
            <Swiper
                showsButtons={true}
                showsPagination={true}
                autoplay={true}
                autoplayTimeout={3}
                height={200}
                style={{height: 200, borderColor: '#d9d9d9'}}
                paginationStyle={{ position: 'absolute',  top: -350}}
                activeDotStyle={{ backgroundColor: '#d9d9d9' }} 
                buttonWrapperStyle={{
                }}
                nextButton={
                    <SwipeButton>
                        <SvgXml xml={svg.right} />
                    </SwipeButton>
                }
                prevButton={
                    <SwipeButton>
                        <SvgXml xml={svg.left} />
                    </SwipeButton>
                }
            >
            {images.map((image, index) => (
                <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={image} style={{ width: '100%' }} />
                </View> 
            ))}
            </Swiper>
        </Container>
    )
}

export default TopSwiper;