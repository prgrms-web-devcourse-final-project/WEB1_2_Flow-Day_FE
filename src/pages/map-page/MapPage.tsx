import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import MapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';
import { MapSearch } from '@/components/map/MapSearch';
import { CourseList } from '@/components/map/CourseList';
import { Course, Spot } from '@/types/course';
// import CustomMarker from '@/components/map/CustomMarker';
import { courseApi } from '@/api/courseApi';
import { GOOGLE_MAPS_API_KEY } from '@env'; 
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SpotDetail: { spotId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
 flex: 1;
`;

const StyledMapView = styled(MapView)`
 width: 100%;
 height: 100%;
`;

const MapPage = () => {
 const navigation = useNavigation<NavigationProp>();
 const [courses, setCourses] = useState<Course[]>([]);
 const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
 const mapRef = useRef<MapView>(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleMarkerPress = (placeId: string) => {
  navigation.navigate('SpotDetail', {
    spotId: placeId
  });
};

 const initialRegion: Region = {
   latitude: 37.5665,
   longitude: 126.9780,
   latitudeDelta: 0.0922,
   longitudeDelta: 0.0421,
 };

 useEffect(() => {
  if (courses.length > 0 && mapRef.current) {
    const allSpots = courses.flatMap(course => course.spots || [])
      // latitude와 longitude가 있는 spots만 필터링하고 타입 가드 적용
      .filter((spot): spot is Spot & { latitude: string; longitude: string } => 
        spot.latitude !== undefined && spot.longitude !== undefined);

    if (allSpots.length > 0) {
      const coordinates = allSpots
        .map(spot => ({
          latitude: parseFloat(spot.latitude),
          longitude: parseFloat(spot.longitude)
        }))
        .filter(coord => !isNaN(coord.latitude) && !isNaN(coord.longitude));

      if (coordinates.length > 0) {
        setTimeout(() => {
          mapRef.current?.fitToCoordinates(coordinates, {
            edgePadding: {
              top: 50,
              right: 50,
              bottom: 150,
              left: 50,
            },
            animated: true,
          });
        }, 1000);
      }
    }
  }
}, [courses]);

const getPlaceCoordinates = async (placeId: string): Promise<{latitude: number, longitude: number} | null> => {
  try {
    console.log('Fetching coordinates for placeId:', placeId);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    console.log('Place API response:', data);
    
    if (data.result?.geometry?.location) {
      const coordinates = {
        latitude: data.result.geometry.location.lat,
        longitude: data.result.geometry.location.lng
      };
      console.log('Extracted coordinates:', coordinates);
      return coordinates;
    }
    return null;
  } catch (error) {
    console.error('Error fetching place coordinates:', error);
    return null;
  }
};

 const loadCourses = async () => {
   try {
     setLoading(true);
     setError(null);
     const response = await courseApi.getCourses();
     
     if (response?.content) {
       const coursesWithCoordinates = await Promise.all(
         response.content.map(async (course) => {
           if (!course.spots) return course;
           
           const spotsWithCoordinates = await Promise.all(
            course.spots.map(async (spot) => {
              const coordinates = await getPlaceCoordinates(spot.placeId);
              if (!coordinates) return null;
              
              // 타입 단언 제거하고 직접 객체 생성
              return {
                id: spot.id,
                placeId: spot.placeId,
                name: spot.name,
                city: spot.city,
                comment: spot.comment,
                sequence: spot.sequence,
                courseId: spot.courseId,
                voteId: spot.voteId,
                memberId: spot.memberId,
                isOwner: spot.isOwner,
                latitude: coordinates.latitude.toString(),
                longitude: coordinates.longitude.toString()
              };
            })
          );
          
          const validSpots = spotsWithCoordinates.filter((spot): spot is NonNullable<typeof spot> => spot !== null);
           
           return {
             ...course,
             spots: validSpots
           } as Course;
         })
       );
       
       setCourses(coursesWithCoordinates);
     }
   } catch (error) {
     console.error('코스 목록 로드 실패:', error);
     setError(error instanceof Error ? error.message : '코스 목록을 불러오는데 실패했습니다.');
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   loadCourses();
 }, []);

 return (
   <Container>
    <StyledMapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={initialRegion}
          >
            {courses.map(course => {
              return (
                <React.Fragment key={course.id}>
                  {course.spots?.map((spot, index) => {
                    const lat = spot.latitude;
                    const lng = spot.longitude;
                    
                    if (lat && lng) {
                      const latitude = parseFloat(lat);
                      const longitude = parseFloat(lng);
                      
                      if (!isNaN(latitude) && !isNaN(longitude)) {
                        return (
                          <Marker
                            key={`${course.id}-${spot.id}`}
                            coordinate={{ latitude, longitude }}
                            title={spot.name}
                            description={spot.comment}
                            onPress={() => handleMarkerPress(spot.placeId)} 
                          >
                            <View style={{
                              width: 30,
                              height: 30,
                              backgroundColor: course.color || '#FF6666',
                              borderRadius: 15,
                              borderWidth: 2,
                              borderColor: 'white',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}>
                              <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
                            </View>
                          </Marker>
                        );
                      }
                    }
                    return null;
                  })}
                </React.Fragment>
              );
            })}
        </StyledMapView>
     <MapSearch />
     <CourseList 
       courses={courses}
       loading={loading}
       error={error}
       selectedCourse={selectedCourse}
       setSelectedCourse={setSelectedCourse}
       onCoursesUpdate={loadCourses}
     />
   </Container>
 );
};

export default MapPage;