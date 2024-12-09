import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const PostHeaderDesign = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: center;
  height: 56px;
  border: 1px solid #EEEEEE;
`;

const PostHeaderTitle = styled.Text`
  font-size: 16px;
  font-family: 'SCDream5';
  width: max-content;
  text-align: center;
  margin: auto;
`;

const PostHeaderBackButton = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
  top: 16px;
`;

const PostHeaderBackImage = styled.Image`
  width: 24px;
  height: 24px;
`;

interface PostHeaderProps {
  children: React.ReactNode;
}

const PostHeader: React.FC<PostHeaderProps> = ({ children }) => {
  const navigation = useNavigation();
  return (
    <PostHeaderDesign>
      <PostHeaderBackButton onPress={() => navigation.goBack()}>
        <PostHeaderBackImage source={require('../../assets/icons/back.png')} />
      </PostHeaderBackButton>
      <PostHeaderTitle>
        <Text>{children}</Text>
      </PostHeaderTitle>
    </PostHeaderDesign>
  );
};

export default PostHeader;
