
import React, { useState } from 'react';
import { View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { Course, Spot } from '@/types/course';
import { courseApi } from '@/api/courseApi';

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
  borderRadius: 8px;
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

// 임시 더미 데이터
const dummySpots: Spot[] = [
  {
    id: 1,
    placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    name: '청담과 본점',
    city: '서울특별시 중구',
    comment: '맛있는 레스토랑',
    sequence: 1,
    courseId: 1,
    voteId: 0,
    memberId: 1,
    isOwner: true
  },
  {
    id: 2,
    placeId: "ChIJN2t_tDeuEmsRUsoyG83frY4",
    name: '남산 서울타워',
    city: '서울특별시 용산구',
    comment: '전망이 좋은 관광지',
    sequence: 2,
    courseId: 1,
    voteId: 0,
    memberId: 1,
    isOwner: true
  },
  {
    id: 3,
    placeId: "ChIJN3t_tDeuEmsRUsoyG83frY4",
    name: '스타벅스 청담점',
    city: '서울특별시 강남구',
    comment: '편안한 카페',
    sequence: 3,
    courseId: 1,
    voteId: 0,
    memberId: 1,
    isOwner: true
  }
];

const CourseDetail = ({ course, onBack }: CourseDetailProps) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedSpots([]);
  };

  const toggleSpotSelection = (spotId: number) => {
    if (selectedSpots.includes(spotId)) {
      // 이미 선택된 경우 제거
      setSelectedSpots(selectedSpots.filter(id => id !== spotId));
    } else {
      // 선택되지 않은 경우 추가
      setSelectedSpots([...selectedSpots, spotId]);
    }
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
              // 선택된 모든 장소 삭제
              for (const spotId of selectedSpots) {
                await courseApi.deleteSpot(course.id, spotId);
              }
              Alert.alert('성공', '선택한 장소들이 삭제되었습니다.');
              setSelectedSpots([]);
              setIsDeleteMode(false);
              // TODO: 장소 목록 새로고침 로직 추가
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
        {dummySpots.map((spot, index) => (
          <SpotItemContainer key={spot.id}>
            <SpotItem>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SequenceCircle>
                  <SequenceNumber>{index + 1}</SequenceNumber>
                </SequenceCircle>
                <SpotImage />
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
        ))}
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
