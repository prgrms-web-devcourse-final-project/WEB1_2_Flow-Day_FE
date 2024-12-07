import { View } from "react-native";
import styled from "styled-components/native";

const ProfileImage = styled.Image`
    width: 110px;
    border-radius: 110px;
`

const MyPage = () => {
    return(
        <View>
            <ProfileImage source={require('../../assets/images/daejeon.png')} />

        </View>
    )
}

export default MyPage;
