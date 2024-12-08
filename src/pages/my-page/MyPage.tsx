import { Image } from "react-native";
import styled from "styled-components/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import apiClient from "@/utils/apiClient";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

const Container = styled.View`
    padding: 15px;
    flex: 1;
    background-color: #FFFFFF;
`

const ProfileImage = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 110px;
    background-color: #EEEEEE;
`

const ProfileText = styled.Text`
    font-family: 'SCDream5';
    font-size: 16px;
    padding: 10px 0;
`;

const TopProfile = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0;
`;

const ProfileBox = styled.View`
    align-items: center;
`;

const Heart = styled.Text`
    font-size: 30px;
`; 

const Date = styled.Text`
    font-size: 14px;
`;

const MenuContainer = styled.View`

`;

const MenuBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const MenuIcon = styled.Image`
    width: 30px;
    height: 30px;
    margin: 10px 0;
`

const MenuText = styled.Text`
    font-family: 'SCDream3';
    font-size: 14px;
    padding: 10px 8px;
`;

const ColumnBox = styled.View`
    flex-direction: row;
    align-items: center;
`

const ImageBox = styled.View`
    width: 110px;
    height: 110px;
    border-radius: 110px;
    border: 1px solid #EEEEEE;
    align-items: center;
    justify-content: center;
`;

const MenuData = [
    {
        icon: require('../../assets/icons/post.png'),
        title: '내 포스트',
        type: '',
        route: 'MyPost'
    },
    {
        icon: require('../../assets/icons/heart.png'),
        title: '좋아요 누른 포스트',
        type: '/likes',
        route: 'MyLike',
    },
    {
        icon: require('../../assets/icons/comment.png'),
        title: '댓글 작성한 포스트',
        type: '/reply',
        route: 'MyComment',
    },
    {
        icon: require('../../assets/icons/user.png'),
        title: '회원 정보 수정',
        route: 'MyInfo',
    }
]

type RootStackParamList = {
    MyPage: undefined;
    PostListPage: { type: string | null; title: string | null };
    MyInfo: undefined;
};

const MyPage = () => {
    const [data, setData] = useState<any>();
    const getInfo = async () => {
        try {
            const response = await apiClient.get('/members/');
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);


    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { logOut } = useStore();

    const handleNavigate = (type: string | undefined, title: string) => {
        console.log(type);
        console.log(title);
        if(!type && type !== '') {
            navigation.navigate('MyInfo');
            return
        }
        navigation.navigate('PostListPage', { type, title });
    };

    const getDate = () => {
        if(!data?.relationshipDt) return 0;
        const start = new globalThis.Date(data.relationshipDt);
        const today = new globalThis.Date();

        const time = Math.abs(today.getTime() - start.getTime());

        const days = Math.ceil(time / (1000 * 60 * 60 * 24));

        return days;
    }

    return(
        <Container>
            <TopProfile>
                <ProfileBox>
                    <ProfileImage source={{uri: data?.profileImage}} />
                    <ProfileText>{data?.name}</ProfileText>
                </ProfileBox>
                <ProfileBox>
                    <Heart>❤️</Heart>
                    <Date>D+{getDate()}</Date>
                </ProfileBox>
                {
                    data?.partnerId ? (
                        <ProfileBox>
                            <ProfileImage source={{uri: data?.partnerImage}} />
                            <ProfileText>{data?.partnerName}</ProfileText>
                        </ProfileBox>
                    ) : (
                        <ProfileBox>
                            <ImageBox>
                                <Image source={require('../../assets/icons/plus.png')}  />
                            </ImageBox>
                            <ProfileText>연인을 추가해주세요</ProfileText>
                        </ProfileBox>
                        
                    )
                }
                
            </TopProfile>
            <MenuContainer>
                {
                    MenuData.map((menu, index) => {
                        return (
                            <MenuBox key={index} onPress={() => handleNavigate(menu.type, menu.title)}>
                                <ColumnBox>
                                    <MenuIcon source={menu.icon} />
                                    <MenuText>{menu.title}</MenuText>
                                </ColumnBox>
                                <MenuIcon source={require('../../assets/icons/arrow.png')} />
                            </MenuBox>
                        )
                    })
                }
                <MenuBox onPress={() => logOut()}>
                    <ColumnBox>
                        <MenuIcon source={require('../../assets/icons/logout.png')} />
                        <MenuText>로그아웃</MenuText>
                    </ColumnBox>
                    <MenuIcon source={require('../../assets/icons/arrow.png')} />
                </MenuBox>
            </MenuContainer>
        </Container>
    )
}

export default MyPage;
