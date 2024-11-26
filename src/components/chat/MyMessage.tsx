import React from 'react';
import styled from 'styled-components/native';

interface MyMessageProps {
  message: string;
}

const MyMessageDesign = styled.View`
  margin-top: 10px;
  margin-left: auto;
  margin-right: 5px;
  justify-content: center;
  flex-direction: row;
`;

const TextDesign = styled.View`
  border: 1px solid #ff6666;
  border-radius: 6px;
  background-color: #ff6666;
`;

const MyMessageText = styled.Text`
  max-width: 220px;
  max-height: 300px;
  min-width: fit-content;
  min-height: 30px;
  font-size: 14px;
  justify-content: center;
  padding: 10px;
  color: #ffffff;
`;

const SendTime = styled.Text`
  width: 30px;
  height: 20px;
  font-size: 10px;
  color: #7d7d7d;
  margin-top: auto;
  margin-right: 2px;
  /* border: 1px solid black; */
  /* align-items: center; */
  justify-content: center;
`;

const MyMessage: React.FC<MyMessageProps> = ({ message }) => {
  return (
    <MyMessageDesign>
      <SendTime>15:00</SendTime>
      <TextDesign>
        <MyMessageText>{message}</MyMessageText>
      </TextDesign>
    </MyMessageDesign>
  );
};

export default MyMessage;
