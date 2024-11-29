import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const AlertItemIcon = ({type}: {type: string}) => {
  const iconSource = getIcon(type); // type에 맞는 아이콘을 얻어옴
  return <Icon source={iconSource} />;
};

export default AlertItemIcon;

// type에 맞는 아이콘을 반환하는 함수
const getIcon = (type: string) => {
  switch (type) {
    case 'COMMENT':
      return require('../../assets/icons/alert-icons/comment.png');
    case 'LIKE':
      return require('../../assets/icons/alert-icons/like.png');
    case 'COUPLE':
      return require('../../assets/icons/alert-icons/couple.png');
    case 'VOTE':
      return require('../../assets/icons/alert-icons/vote.png');
    case 'COURSE':
      return require('../../assets/icons/alert-icons/course.png');
    default:
      return undefined;
  }
};

// 스타일링된 이미지 컴포넌트
const Icon = styled.Image`
  width: 24px;
  height: 24px;
  margin: auto 10px;
`;
