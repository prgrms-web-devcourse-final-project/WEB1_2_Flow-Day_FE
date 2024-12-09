import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { courseApi, WishSpot } from '@/api/courseApi';
import axios from 'axios';
interface WishListProps {
  onBack: () => void;
}


const DetailContainer = styled.View`
  flex: 1;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const DetailHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
`;

const HeaderContent = styled.View`
  padding: 16px 20px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.TouchableOpacity`
  padding: 8px;
  padding-left: 0;
`;

const Title = styled.Text`
  font-size: 18px;
  font-family: 'SCDream5';
  flex: 1;
  text-align: center;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 8px;
`;

const DeleteButtonText = styled.Text<{ isActive?: boolean }>`
  color: ${props => props.isActive ? '#FF6666' : '#666666'};
  font-family: 'SCDream4';
  font-size: 14px;
`;

const DragIndicator = styled.View`
  width: 30px;
  height: 2px;
  background-color: #E0E0E0;
  border-radius: 2px;
  margin: 8px auto;
`;

const SpotItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #EEEEEE;
  align-items: center;
`;

const SpotImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  background-color: #F5F5F5;
`;

const SpotInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const SpotName = styled.Text`
  font-size: 14px;
  font-family: 'SCDream5';
  margin-bottom: 4px;
`;

const SpotCity = styled.Text`
  font-size: 12px;
  color: #666666;
  font-family: 'SCDream4';
`;

const SpotComment = styled.Text`
  font-size: 12px;
  color: #999999;
  font-family: 'SCDream4';
  margin-top: 4px;
`;

const DeleteConfirmButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FF6666;
  padding: 16px;
  align-items: center;
`;

const DeleteConfirmText = styled.Text`
  color: white;
  font-size: 16px;
  font-family: 'SCDream5';
`;

const WishList = ({ onBack }: WishListProps) => {
  const [spots, setSpots] = useState<WishSpot[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWishPlaces = async () => {
    try {
      setLoading(true);
      console.log('위시리스트 요청 시작');
      const response = await courseApi.getWishPlaces();
      console.log('위시리스트 응답 전체:', JSON.stringify(response));
      if (response && response.spots) {
        console.log('위시리스트 spots:', response.spots);
        setSpots(response.spots);
      } else {
        console.log('spots가 없거나 비어있음');
        setSpots([]);
      }
    } catch (error) {
      console.error('위시리스트 에러:', error);
      if (axios.isAxiosError(error)) {
        console.log('에러 상태:', error.response?.status);
        console.log('에러 데이터:', error.response?.data);
      }
      Alert.alert('오류', '위시리스트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishPlaces();
  }, []);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedSpots([]);
  };

  const toggleSpotSelection = (spotId: number) => {
    if (!isDeleteMode) return;
    setSelectedSpots(prev =>
      prev.includes(spotId)
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedSpots.length === 0) {
      Alert.alert('알림', '선택된 장소가 없습니다.');
      return;
    }
  
    try {
      setLoading(true);
      await Promise.all(selectedSpots.map(spotId => 
        courseApi.deleteWishPlace(spotId)
      ));
      await loadWishPlaces();  // 삭제 후 목록 다시 불러오기
      setIsDeleteMode(false);
      setSelectedSpots([]);
      Alert.alert('성공', '선택한 장소들이 삭제되었습니다.');
    } catch (error) {
      console.error('Failed to delete spots:', error);
      Alert.alert('오류', '장소 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DetailContainer>
      <DragIndicator />
      <DetailHeader>
        <HeaderContent>
          <TitleContainer>
            <BackButton onPress={onBack}>
              <SvgXml xml={svg.back} width={24} height={24} />
            </BackButton>
            <Title>마이 위시리스트</Title>
            <DeleteButton onPress={toggleDeleteMode}>
            <SvgXml 
              xml={svg.trash} 
              width={20} 
              height={20} 
              color={isDeleteMode ? '#FF6666' : '#7d7d7d'}
            />
              <DeleteButtonText isActive={isDeleteMode}>
                삭제
              </DeleteButtonText>
            </DeleteButton>
          </TitleContainer>
        </HeaderContent>
      </DetailHeader>

      <ScrollView style={{ marginBottom: isDeleteMode ? 60 : 0 }}>



        
        {spots.map((spot) => (
          <SpotItem 
            key={spot.id}
            onPress={() => toggleSpotSelection(spot.id)}
          >
            <SpotImage source={{ uri: spot.photoUrl }} />
            <SpotInfo>
              <SpotName>{spot.name}</SpotName>
              <SpotCity>{spot.city}</SpotCity>
              {spot.comment && <SpotComment>{spot.comment}</SpotComment>}
            </SpotInfo>
            {isDeleteMode && (
              <View style={{ padding: 8 }}>
                <SvgXml 
                  xml={selectedSpots.includes(spot.id) ? svg.add : svg.check}
                  width={24} 
                  height={24} 
                />
              </View>
            )}
          </SpotItem>
        ))}
      </ScrollView>

      {isDeleteMode && (
        <DeleteConfirmButton onPress={handleDeleteSelected}>
          <DeleteConfirmText>삭제</DeleteConfirmText>
        </DeleteConfirmButton>
      )}
    </DetailContainer>
  );
};

export default WishList;