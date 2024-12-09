import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import usePostDetailStore from '@/store/post/post-detail-store';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface SpotWithCoordinates {
  id: number;
  placeId: string;
  name: string;
  city: string;
  comment: string;
  sequence: number;
  courseId: number;
  voteId: string | null;
  coordinate: Coordinate;
}

const PostMap = () => {
  const mapRef = useRef<MapView>(null);
  const postDetailData = usePostDetailStore(state => state.postDetailData);
  const [spotsWithCoordinates, setSpotsWithCoordinates] = useState<SpotWithCoordinates[]>([]);
  
  const initialRegion: Region = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getPlaceCoordinates = async (placeId: string): Promise<Coordinate | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      
      if (data.result?.geometry?.location) {
        return {
          latitude: data.result.geometry.location.lat,
          longitude: data.result.geometry.location.lng
        };
      }
      return null;
    } catch (error) {
      console.error('Error fetching place coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadSpotCoordinates = async () => {
      if (postDetailData.spots && postDetailData.spots.length > 0) {
        const spotsPromises = postDetailData.spots.map(async (spot) => {
          const coordinate = await getPlaceCoordinates(spot.placeId);
          if (!coordinate) return null;
          
          return {
            ...spot,
            coordinate,
          } as SpotWithCoordinates;
        });

        const spotsResults = await Promise.all(spotsPromises);
        const validSpots = spotsResults.filter((spot): spot is SpotWithCoordinates => spot !== null);
        setSpotsWithCoordinates(validSpots);

        if (validSpots.length > 0 && mapRef.current) {
          const coordinates = validSpots.map(spot => spot.coordinate);
          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
            animated: true,
          });
        }
      }
    };

    loadSpotCoordinates();
  }, [postDetailData.spots]);

  return (
    <PostMapDesign>
      <PostMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        {spotsWithCoordinates.map((spot, index) => (
          <Marker
            key={spot.id}
            coordinate={spot.coordinate}
            title={spot.name}
            description={spot.comment}
          >
            <View style={{
              width: 30,
              height: 30,
              backgroundColor: '#FF6666',
              borderRadius: 15,
              borderWidth: 2,
              borderColor: 'white',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
            </View>
          </Marker>
        ))}
      </PostMapView>
    </PostMapDesign>
  );
};

export default PostMap;

const PostMapDesign = styled.View``;

const PostMapView = styled(MapView)`
  width: 370px;
  height: 200px;
`;