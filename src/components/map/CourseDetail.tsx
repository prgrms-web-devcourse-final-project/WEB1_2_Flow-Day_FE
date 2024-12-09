import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { svg } from '@/assets/icons/svg';
import { Course, Spot } from '@/types/course';
import { courseApi } from '@/api/courseApi';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  SpotDetail: { spotId: string };
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  navigation: any;
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

const SpotItem = styled.TouchableOpacity`
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

const TitleInput = styled.TextInput`
  fontSize: 18px;
  fontFamily: 'SCDream5';
  padding: 8px 12px;
  borderWidth: 1px;
  borderColor: #ccc;
  borderRadius: 6px;
  minWidth: 200px;
`;

const VoteButton = styled.TouchableOpacity`
  flexDirection: row;
  alignItems: center;
  
`;

const VoteText = styled.Text<{ isActive: boolean }>`
  fontSize: 14px;
  color: ${props => props.isActive ? '#FF6666' : '#7d7d7d'};
  fontFamily: 'SCDream4';
  marginLeft: 4px;
`;

const VoteActionButton = styled.TouchableOpacity`
  backgroundColor: #FF6666;
  padding: 16px;
  alignItems: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const VoteActionText = styled.Text`
  color: white;
  fontSize: 16px;
  fontFamily: 'SCDream5';
`;

const SequenceInput = styled.TextInput`
  width: 35px;
  height: 35px;
  backgroundColor: white;
  borderRadius: 4px;
  borderWidth: 1px;
  borderColor: #FF6666;
  textAlign: center;
  color: #FF6666;
  marginRight: 8px;
  fontSize: 16px;
  padding: 0;
`;
const SequenceButton = styled.TouchableOpacity`
  flexDirection: row;
  alignItems: center;
`;

const SequenceText = styled.Text<{ isActive: boolean }>`
  fontSize: 14px;
  color: ${props => props.isActive ? '#FF6666' : '#7d7d7d'};
  fontFamily: 'SCDream4';
  marginLeft: 4px;
`;

const SequenceActionButton = styled.TouchableOpacity`
  backgroundColor: #FF6666;
  padding: 16px;
  alignItems: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;




const CourseDetail = ({ course, onBack }: CourseDetailProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isVoteMode, setIsVoteMode] = useState(false);
  const [selectedSpots, setSelectedSpots] = useState<number[]>([]);
  const [spots, setSpots] = useState<SpotWithPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [voteTitle, setVoteTitle] = useState('');
  const [isSequenceMode, setIsSequenceMode] = useState(false);
  const [sequences, setSequences] = useState<{[key: number]: string}>({});

  const toggleSequenceMode = () => {
    setIsSequenceMode(!isSequenceMode);
    if (!isSequenceMode) {
      setIsDeleteMode(false);
      setIsVoteMode(false);
      // 초기값을 문자열로 설정
      const initialSequences = spots.reduce((acc, spot, index) => {
        acc[spot.id] = (index + 1).toString();
        return acc;
      }, {} as {[key: number]: string});
      setSequences(initialSequences);
    } else {
      setSequences({});
    }
  };
  
  const handleSequenceChange = (spotId: number, value: string) => {
    const number = parseInt(value);
    if (value === '' || (!isNaN(number) && number > 0 && number <= spots.length)) {
      setSequences(prev => ({...prev, [spotId]: value}));
    }
  };
  

  const handleSpotPress = (spot: SpotWithPhoto) => {
    if (!isDeleteMode && !isVoteMode) {
      navigation.navigate('SpotDetail', {
        spotId: spot.placeId
      });
    }
  };

  const handleUpdateSequence = async () => {
    try {
      // 문자열을 숫자로 변환하여 정렬
      const sortedSpots = [...spots].sort((a, b) => {
        const aSeq = parseInt(sequences[a.id] || '0');
        const bSeq = parseInt(sequences[b.id] || '0');
        return aSeq - bSeq;
      });
  
      // API 호출 시 숫자로 변환
      for (let i = 0; i < sortedSpots.length; i++) {
        const spot = sortedSpots[i];
        await courseApi.updateSpotSequence(course.id, spot.id, i + 1);
      }
  
      await loadCourseDetails();
      setIsSequenceMode(false);
      Alert.alert('성공', '순서가 변경되었습니다.');
    } catch (error) {
      Alert.alert('오류', '순서 변경에 실패했습니다.');
    }
  };

  const getPlacePhoto = async (placeId: string): Promise<string | undefined> => {
    try {

      const detailsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`
      );
      const detailsData = await detailsResponse.json();

      
      if (detailsData.result?.photos?.[0]?.photo_reference) {
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${detailsData.result.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;

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
    if (!isDeleteMode) {
      setIsVoteMode(false);  
    }
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
  
  const toggleVoteMode = () => {
    setIsVoteMode(!isVoteMode);
    if (!isVoteMode) {
      setIsDeleteMode(false);
      setVoteTitle(''); // 투표 모드 진입 시 타이틀 초기화
    }
    setSelectedSpots([]);
  };
  

  const handleCreateVote = () => {
    if (selectedSpots.length === 0) {
      Alert.alert('알림', '선택된 장소가 없습니다.');
      return;
    }

    if (!voteTitle.trim()) {
      Alert.alert('알림', '투표 제목을 입력해주세요.');
      return;
    }

    Alert.alert(
      '투표 생성',
      '선택한 장소들로 투표를 생성하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '생성',
          onPress: async () => {
            // 여기에 나중에 투표 생성 API 추가
            Alert.alert('성공', '투표를 생성했습니다.', [
              {
                text: '확인',
                onPress: () => {
                  setIsVoteMode(false);
                  setSelectedSpots([]);
                  setVoteTitle('');
                }
              }
            ]);
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
        <TitleContainer>
          <BackButton onPress={onBack}>
            <SvgXml xml={svg.back} width={24} height={24} />
          </BackButton>
          {isVoteMode ? (
            <TitleInput
              value={voteTitle}
              onChangeText={setVoteTitle}
              placeholder="투표 제목을 입력해주세요"
              placeholderTextColor="#999"
            />
          ) : (
            <DetailTitle>{course?.title || '코스 상세'}</DetailTitle>
          )}
        </TitleContainer>
        <ButtonContainer>
          <SequenceButton onPress={toggleSequenceMode}>
            <SvgXml 
              xml={svg.plusCircle} 
              width={20} 
              height={20} 
              color={isSequenceMode ? '#FF6666' : '#7d7d7d'}
            />
            <SequenceText isActive={isSequenceMode}>
            {isSequenceMode ? '변경취소' : '순서변경'}
            </SequenceText>
          </SequenceButton>
          <VoteButton onPress={toggleVoteMode}>
            <SvgXml 
              xml={svg.plusCircle} 
              width={20} 
              height={20} 
              color={isVoteMode ? '#FF6666' : '#7d7d7d'}
            />
            <VoteText isActive={isVoteMode}>투표</VoteText>
          </VoteButton>
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
        ) : (
          spots.map((spot, index) => (
            <SpotItemContainer key={spot.id}>
              <SpotItem 
                onPress={() => handleSpotPress(spot)}
                disabled={isDeleteMode || isVoteMode || isSequenceMode}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {isSequenceMode ? (
                  <SequenceInput
                    value={sequences[spot.id]?.toString()}
                    onChangeText={(value) => handleSequenceChange(spot.id, value)}
                    keyboardType="numeric"
                    maxLength={2}
                    autoFocus={index === 0} // 첫 번째 input에 자동 포커스
                    placeholder={`${index + 1}`} // 이전 번호를 placeholder로 표시
                    placeholderTextColor="#999"
                  />
                ) : (
                  <SequenceCircle>
                    <SequenceNumber>{index + 1}</SequenceNumber>
                  </SequenceCircle>
                )}
                  <SpotImage 
                    source={{ uri: spot.photoUrl || '' }}
                    style={{ width: 80, height: 80 }}  
                    resizeMode="cover"  
                  />
                  <SpotInfo>
                    <SpotName>{spot.name}</SpotName>
                    <SpotAddress>{spot.city}</SpotAddress>
                    <SpotCategory>{spot.comment}</SpotCategory>
                  </SpotInfo>
                  <CategoryButton 
                    onPress={() => {
                      if (isVoteMode || isDeleteMode) {
                        toggleSpotSelection(spot.id);
                      }
                    }}
                  >
                    <SvgXml 
                      xml={
                        isVoteMode 
                          ? (selectedSpots.includes(spot.id) ? svg.add : svg.check)
                          : isDeleteMode
                            ? (selectedSpots.includes(spot.id) ? svg.add : svg.check)
                            : svg.list
                      } 
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
 
      {isVoteMode && (
        <VoteActionButton onPress={handleCreateVote}>
          <VoteActionText>투표 생성</VoteActionText>
        </VoteActionButton>
      )}
 
      {isSequenceMode && (
        <SequenceActionButton onPress={handleUpdateSequence}>
          <VoteActionText>순서변경 완료</VoteActionText>
        </SequenceActionButton>
      )}
    </DetailContainer>
  );
};

export default CourseDetail;