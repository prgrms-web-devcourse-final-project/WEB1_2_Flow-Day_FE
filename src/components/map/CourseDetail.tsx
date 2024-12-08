import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { Course, Spot } from '@/types/course';
import { courseApi } from '@/api/courseApi';
import { GOOGLE_MAPS_API_KEY } from '@env';


interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

interface SpotWithPhoto extends Spot {
  photoUrl?: string;
}

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}


const DetailContainer = styled.View`
  flex: 1;
  backgroundColor: white;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
  overflow: hidden;  
`;

const DetailHeader = styled.View`
  borderBottomWidth: 1px;
  borderBottomColor: #EEEEEE;
  backgroundColor: white;
`;

const HeaderContent = styled.View`
  height: 60px;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  padding: 0 20px;
  
`;

const DragIndicator = styled.View`
  width: 30px;
  height: 2px;
  backgroundColor: #E0E0E0;
  borderRadius: 2px;
  margin: 8px auto;
`;
const BackButton = styled.TouchableOpacity`
  position: absolute;
  padding: 8px;
  left: 16px;
  zIndex: 1;
`;

const DetailTitle = styled.Text`
  fontSize: 18px;
  fontFamily: 'SCDream5';
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  flexDirection: row;
  alignItems: center;
`;

const DeleteText = styled.Text`
  fontSize: 14px;
  color: #7d7d7d;
  fontFamily: 'SCDream4';
  marginLeft: 4px;
`;

const SpotItemContainer = styled.View`
  position: relative;
`;

const SpotItem = styled.View`
  flexDirection: row;
  padding: 16px;
  borderBottomWidth: 1px;
  borderBottomColor: #EEEEEE;
`;


const SpotImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const SpotInfo = styled.View`
  flex: 1;
  marginLeft: 16px;
`;

const SpotName = styled.Text`
  fontSize: 16px;
  fontFamily: 'SCDream5';
  marginBottom: 4px;
`;

const SpotAddress = styled.Text`
  fontSize: 14px;
  color: #666666;
  fontFamily: 'SCDream4';
`;

const SpotCategory = styled.Text`
  fontSize: 12px;
  color: #999999;
  fontFamily: 'SCDream4';
  marginTop: 4px;
`;

const SequenceCircle = styled.View`
  width: 24px;
  height: 24px;
  borderRadius: 12px;
  backgroundColor: #FF6666;
  justifyContent: center;
  alignItems: center;
  marginRight: 8px;
`;

const SequenceNumber = styled.Text`
  color: white;
  fontSize: 14px;
  fontFamily: 'SCDream5';
`;

const CategoryButton = styled.TouchableOpacity`
  padding: 8px;
  marginLeft: auto;
`;

const DeleteActionButton = styled.TouchableOpacity`
  backgroundColor: #FF6666;
  padding: 16px;
  alignItems: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const DeleteActionText = styled.Text`
  color: white;
  fontSize: 16px;
  fontFamily: 'SCDream5';
`;


const CourseDetail = ({ course, onBack }: CourseDetailProps) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [spots, setSpots] = useState<SpotWithPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  const getPlacePhoto = async (placeId: string): Promise<string | undefined> => {
    try {
      // console.log('Fetching place details for placeId:', placeId);
      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`
      );
      const detailsData = await detailsResponse.json();
      // console.log('Place details response:', detailsData);
      
      if (detailsData.result?.photos?.[0]?.photo_reference) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${detailsData.result.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
        // console.log('Generated photo URL:', photoUrl);
        return photoUrl;
      }
      
      console.log('No photo reference found');
      return undefined;
    } catch (error) {
      console.error('Error fetching place photo:', error);
      return undefined;
    }
  };

  const loadCourseDetails = async () => {
    try {
      setLoading(true);
      const courseData = await courseApi.getCourseById(course.id);
      
      if (courseData.spots) {
        // 각 장소에 대한 사진 URL 가져오기
        const spotsWithPhotos = await Promise.all(
          courseData.spots.map(async (spot) => {
            const photoUrl = await getPlacePhoto(spot.placeId);
            return { ...spot, photoUrl };
          })
        );
        setSpots(spotsWithPhotos);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '코스 상세 정보를 불러오는데 실패했습니다.';
      Alert.alert('오류', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourseDetails();
  }, [course.id]);


  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedSpots([]);
  };

  const toggleSpotSelection = (spotId: number) => {
    setSelectedSpots(prev =>
      prev.includes(spotId) 
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId]
    );
  };

  const handleDeleteSelectedSpots = async () => {
    if (selectedSpots.length === 0) {
      Alert.alert('알림', '선택된 장소가 없습니다.');
      return;
    }

    Alert.alert(
      '장소 삭제',
      `선택한 ${selectedSpots.length}개의 장소를 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              for (const spotId of selectedSpots) {
                await courseApi.deleteSpot(course.id, spotId);
              }
              // 삭제 후 목록 새로고침
              loadCourseDetails();
              Alert.alert('성공', '선택한 장소들이 삭제되었습니다.');
              setSelectedSpots([]);
              setIsDeleteMode(false);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : '삭제 실패';
              Alert.alert('오류', errorMessage);
            }
          }
        }
      ]
    );
  };
  


  return (
    <DetailContainer>
      <DetailHeader>
        <DragIndicator />
        <HeaderContent>
          <BackButton onPress={onBack}>
            <SvgXml xml={svg.back} width={24} height={24} />
          </BackButton>
          <DetailTitle>{course?.title || '코스 상세'}</DetailTitle>
          <DeleteButton onPress={toggleDeleteMode}>
            <SvgXml xml={svg.trash} width={20} height={20} />
            <DeleteText>삭제</DeleteText>
          </DeleteButton>
        </HeaderContent>
      </DetailHeader>

      <ScrollView>
        {loading ? (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>로딩 중...</Text>
          </View>
        ) : (
          spots.map((spot, index) => (
            <SpotItemContainer key={spot.id}>
              <SpotItem>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <SequenceCircle>
                    <SequenceNumber>{index + 1}</SequenceNumber>
                  </SequenceCircle>
                  <SpotImage 
                      source={{ uri: spot.photoUrl || '' }}
                      style={{ width: 80, height: 80 }}  
                      resizeMode="cover"  
                      onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}  
                    />
                  <SpotInfo>
                    <SpotName>{spot.name}</SpotName>
                    <SpotAddress>{spot.city}</SpotAddress>
                    <SpotCategory>{spot.comment}</SpotCategory>
                  </SpotInfo>
                  <CategoryButton onPress={() => isDeleteMode && toggleSpotSelection(spot.id)}>
                    <SvgXml 
                      xml={isDeleteMode 
                        ? (selectedSpots.includes(spot.id) ? svg.add : svg.check)
                        : svg.list} 
                      width={20} 
                      height={20}
                    />
                  </CategoryButton>
                </View>
              </SpotItem>
            </SpotItemContainer>
          ))
        )}
      </ScrollView>

      {isDeleteMode && (
        <DeleteActionButton onPress={handleDeleteSelectedSpots}>
          <DeleteActionText>삭제</DeleteActionText>
        </DeleteActionButton>
      )}
    </DetailContainer>
  );
};

export default CourseDetail;