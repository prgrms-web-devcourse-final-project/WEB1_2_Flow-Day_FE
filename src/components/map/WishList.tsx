import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { Course, Spot } from '@/types/course';
import { courseApi } from '@/api/courseApi';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface WishListProps {
    onBack: () => void;
  }
  
  interface SpotWithPhoto extends Spot {
    photoUrl?: string;
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
  paddingVertical: 16px;
  paddingHorizontal: 20px;
`;

const TitleContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: center;
  marginBottom: 12px; 
  position: relative;
`;

const ButtonContainer = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: flex-end;
  gap: 12px;
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
  left: 0;
  padding: 8px;
  paddingLeft: 0;
`;

const DetailTitle = styled.Text`
  fontSize: 18px;
  fontFamily: 'SCDream5';
  marginLeft: 8px;
`;

const DeleteButton = styled.TouchableOpacity`
  flexDirection: row;
  alignItems: center;
`;

const DeleteText = styled.Text<{ isActive: boolean }>`
  fontSize: 14px;
  color: ${props => props.isActive ? '#FF6666' : '#7d7d7d'};
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

const WishList = ({ onBack }: WishListProps) => {
    const [isDeleteMode, setIsDeleteMode] = useState(false);
    const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
    const [spots, setSpots] = useState<SpotWithPhoto[]>([]);
    const [loading, setLoading] = useState(false);
  
    const getPlacePhoto = async (placeId: string): Promise<string | undefined> => {
      try {
        const detailsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`
        );
        const detailsData = await detailsResponse.json();
        
        if (detailsData.result?.photos?.[0]?.photo_reference) {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${detailsData.result.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
        }
        return undefined;
      } catch (error) {
        console.error('Error fetching place photo:', error);
        return undefined;
      }
    };
  
    const loadWishListDetails = async () => {
      try {
        setLoading(true);
        const data = await courseApi.getWishPlaces();
        
        if (data.spots) {
          const spotsWithPhotos = await Promise.all(
            data.spots.map(async (spot: Spot) => {
              const photoUrl = await getPlacePhoto(spot.placeId);
              return { ...spot, photoUrl };
            })
          );
          setSpots(spotsWithPhotos);
        }
      } catch (error) {
        Alert.alert('오류', '위시리스트를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
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
  
    const handleDeleteSelectedSpots = () => {
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
                setLoading(true);
                for (const spotId of selectedSpots) {
                  await courseApi.deleteWishPlace(spotId);
                }
                await loadWishListDetails();
                Alert.alert('성공', '선택한 장소들이 삭제되었습니다.');
                setSelectedSpots([]);
                setIsDeleteMode(false);
              } catch (error) {
                Alert.alert('오류', '삭제에 실패했습니다.');
              } finally {
                setLoading(false);
              }
            }
          }
        ]
      );
    };
  
    useEffect(() => {
      loadWishListDetails();
    }, []);
  
    return (
      <DetailContainer>
        <DetailHeader>
          <DragIndicator />
          <HeaderContent>
            <TitleContainer>
              <BackButton onPress={onBack}>
                <SvgXml xml={svg.back} width={24} height={24} />
              </BackButton>
              <DetailTitle>위시리스트</DetailTitle>
            </TitleContainer>
            <ButtonContainer>
              <DeleteButton onPress={toggleDeleteMode}>
                <SvgXml 
                  xml={svg.trash} 
                  width={20} 
                  height={20} 
                  color={isDeleteMode ? '#FF6666' : '#7d7d7d'}
                />
                <DeleteText isActive={isDeleteMode}>삭제</DeleteText>
              </DeleteButton>
            </ButtonContainer>
          </HeaderContent>
        </DetailHeader>
  
        <ScrollView>
          {loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text>로딩 중...</Text>
            </View>
          ) : spots.length === 0 ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text>위시리스트가 비어있습니다.</Text>
            </View>
          ) : (
            spots.map((spot) => (
              <SpotItemContainer key={spot.id}>
                <TouchableOpacity onPress={() => isDeleteMode && toggleSpotSelection(spot.id)}>
                  <SpotItem>
                    <SpotImage 
                      source={{ uri: spot.photoUrl || '' }}
                      resizeMode="cover"  
                    />
                    <SpotInfo>
                      <SpotName>{spot.name}</SpotName>
                      <SpotAddress>{spot.city}</SpotAddress>
                      <SpotCategory>{spot.comment}</SpotCategory>
                    </SpotInfo>
                    {isDeleteMode && (
                      <View style={{ justifyContent: 'center', padding: 10 }}>
                        <SvgXml 
                          xml={selectedSpots.includes(spot.id) ? svg.add : svg.check}
                          width={20} 
                          height={20}
                        />
                      </View>
                    )}
                  </SpotItem>
                </TouchableOpacity>
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
  
  export default WishList;