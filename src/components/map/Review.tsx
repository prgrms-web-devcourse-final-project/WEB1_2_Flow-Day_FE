import {Text, View, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {useWindowDimensions} from 'react-native';

const Container = styled(ScrollView)`
  height: 74%;
  padding: 20px 10px;
  background-color: #ffffff;
`;

const ProfileImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  margin-right: 10px;
`;

const ImageBox = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 2px;
`;

const Content = styled.Text`
  /* width: 40%; */
`;

const ProfileContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: 10px;
`;

const Comment = styled.View`
  padding: 10px 0;
`;

const TempView = styled.View`
  height: 100%;
  padding-bottom: 30px;
`;

const Review = (placeData) => {
  const data = placeData.data.reviews;
  console.log(data);
  const {width} = useWindowDimensions();
  const getStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<ImageBox key={i} source={require('../../assets/icons/star.png')} />);
    }
    return stars;
  };

  return (
    <Container>
      <TempView>
        {data.map((review, index) => (
          <Comment>
            <ProfileContent>
              <ProfileImage source={require('../../assets/images/daejeon.png')} />
              <View>
                <Text style={{paddingVirtical: 5}}>{review.author_name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {getStars(review.rating)}
                  <Text style={{paddingLeft: 5}}>{review.relative_time_description}</Text>
                </View>
              </View>
            </ProfileContent>
            <Content style={{width: width * 0.92}}>{review.text}</Content>
          </Comment>
        ))}
      </TempView>
    </Container>
  );
};

export default Review;
