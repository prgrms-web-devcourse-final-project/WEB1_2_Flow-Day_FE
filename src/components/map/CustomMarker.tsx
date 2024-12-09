import React from 'react';
import styled from 'styled-components/native';

interface CustomMarkerProps {
  color: string;
  number: number;
}

const MarkerContainer = styled.View<{ color: string }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: white;
`;

const MarkerNumber = styled.Text`
  color: white;
  font-size: 12px;
  font-family: 'SCDream5';
`;

const CustomMarker = ({ color, number }: CustomMarkerProps) => (
  <MarkerContainer color={color}>
    <MarkerNumber>{number}</MarkerNumber>
  </MarkerContainer>
);

export default CustomMarker;