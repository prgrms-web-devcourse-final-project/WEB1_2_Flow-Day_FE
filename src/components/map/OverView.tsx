import styled from 'styled-components/native';
import {Text, ScrollView, View} from 'react-native';

import {GOOGLE_MAPS_API_KEY} from '@env';
import apiClient from '@/utils/apiClient';
import Buttons from '@/components/Buttons';

const Container = styled.View`
  height: 55%;
  padding: 20px 10px;
  padding-bottom: 0;
  background-color: #ffffff;
`;

const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
`;

const ImageBox = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const PhotoBox = styled.Image`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ContentText = styled.Text`
  width: 90%;
`;

const OverView = (placeData) => {
  const {data} = placeData;

  const hadleSave = async () => {
    const courseId = 7;
    try {
      setLoading(true);
      const response = await apiClient.post(`/courses/${courseId}`, {
        name: data.name,
        placeId: data.place_id,
        comment: '',
        city: data?.formatted_address.slice(0, 2),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.photos?.map((photo, index) => {
            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
            return <PhotoBox key={index} source={{uri: photoUrl}} />;
          })}
        </ScrollView>
        {data?.formatted_address && (
          <InfoBox>
            <ImageBox source={require('../../assets/icons/address.png')} />
            <ContentText>{data?.formatted_address}</ContentText>
          </InfoBox>
        )}
        {data?.current_opening_hours && (
          <InfoBox>
            <ImageBox source={require('../../assets/icons/time.png')} />
            <ContentText>{data?.current_opening_hours?.weekday_text[0]}</ContentText>
          </InfoBox>
        )}
        {data?.formatted_phone_number && (
          <InfoBox>
            <ImageBox source={require('../../assets/icons/call.png')} />
            <ContentText>{data?.formatted_phone_number}</ContentText>
          </InfoBox>
        )}
        {data?.website && (
          <InfoBox>
            <ImageBox source={require('../../assets/icons/site.png')} />
            <ContentText>{data?.website}</ContentText>
          </InfoBox>
        )}
      </View>
      <View>
        <Buttons.ShortBtn text='장소 저장' style={{marginTop: 50}} onPress={() => hadleSave()} />
      </View>
    </Container>
  );
};

export default OverView;
