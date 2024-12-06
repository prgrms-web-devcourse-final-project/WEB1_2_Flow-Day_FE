import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MapSearch } from '@/components/map/MapSearch';
import { CourseList } from '@/components/map/CourseList';

const Container = styled.View`
  flex: 1;
`;

const StyledMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const MapPage = () => {
  const initialRegion: Region = {
    latitude: 37.5665,
    longitude: 126.9780,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <Container>
      <StyledMapView
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      />
      <MapSearch />
      <CourseList />
    </Container>
  );
};

export default MapPage;