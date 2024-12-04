import { svg } from '@/assets/icons/svg';
import { View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Swiper from 'react-native-swiper'
import styled from 'styled-components/native';
import {useWindowDimensions} from 'react-native';

const SwipeButton = styled.Text`
    width: 24px;
    font-weight: 700;
`

const Container = styled.View`
    flex: 0.3;
`

const TopSwiper = () => {
    const {width} = useWindowDimensions();

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
            width={width}
            style={{borderColor: '#d9d9d9'}}
            paginationStyle={{ position: 'absolute',  bottom: 10}}
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
                <Image source={image}  style={{ resizeMode: 'cover'}} />
            </View> 
        ))}
        </Swiper>
        </Container>
    )
}

export default TopSwiper;