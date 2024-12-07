import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';

const PostMap = () => {
  /** 수정 예정 */
  const initialRegion: Region = {
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <PostMapDesign>
      <PostMapView provider={PROVIDER_GOOGLE} initialRegion={initialRegion} />
    </PostMapDesign>
  );
};

export default PostMap;

const PostMapDesign = styled.View``;

const PostMapView = styled(MapView)`
  width: 370px;
  height: 200px;
`;
