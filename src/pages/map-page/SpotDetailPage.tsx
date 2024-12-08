import {View, Text, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {useWindowDimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {GOOGLE_MAPS_API_KEY} from '@env';
import axios from 'axios';
import OverView from '@/components/map/OverView';
import Review from '@/components/map/Review';

const Container = styled.View`
  padding: 30px 10px;
  background-color: #ffffff;
  flex: 1;
`;

const SpotBox = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding-right: 10px;
`;

const SpotText = styled.Text`
  font-family: 'SCDream4';
  font-size: 23px;
  padding: 10px 0;
`;

const SpotRating = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TabText = styled.Text`
  padding: 15px 0 10px 0;
  font-family: 'SCDream4';
  font-size: 18px;
  width: 50%;
  text-align: center;
`;

const TabMenu = styled.TouchableOpacity`
  width: 50%;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => (props.active ? '#FF6666' : '#d9d9d9')};
`;

const TabContent = styled.View``;

const SpotDetailPage = ({navigation, route}) => {
  const [tab, setTab] = useState('overview');
  const {width} = useWindowDimensions();
  const [data, setData] = useState();
  const [mainPhotoUrl, setMainPhotoUrl] = useState();
  const placeId = route.params.spotId;

  const getPlaceDetails = async (placeId: string) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name%2Cplace_id%2Cphotos%2Cformatted_address%2Ccurrent_opening_hours%2Cwebsite%2Cformatted_phone_number%2Crating%2Creviews&language=ko&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await axios.get(url);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  useEffect(() => {
    getPlaceDetails(placeId);
  }, [placeId]);

  useEffect(() => {
    if (data) {
      const photoReference = data.photos?.[0]?.photo_reference;
      const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`
        : 'https://colorate.azurewebsites.net/SwatchColor/B0B0B0';
      setMainPhotoUrl(photoUrl);
    }
  }, [data]);

  return (
    <Container>
      <Image source={{uri: mainPhotoUrl}} style={{width: width, height: 200, backgroundColor: '#EEEEEE'}} />

      <SpotBox>
        <SpotText>{data?.name}</SpotText>
        <SpotRating>
          <Image source={require('../../assets/icons/star.png')} style={{width: 20, height: 20}} />
          <Text style={{fontSize: 20}}>{data?.rating}</Text>
        </SpotRating>
      </SpotBox>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TabMenu onPress={() => setTab('overview')} active={tab === 'overview'}>
            <TabText>개요</TabText>
          </TabMenu>
          <TabMenu onPress={() => setTab('review')} active={tab === 'review'}>
            <TabText>리뷰</TabText>
          </TabMenu>
        </View>
        <TabContent>{tab === 'overview' ? <OverView data={data} /> : <Review data={data} />}</TabContent>
      </View>
    </Container>
  );
};

export default SpotDetailPage;
