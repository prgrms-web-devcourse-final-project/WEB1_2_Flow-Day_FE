import React from 'react';
import styled from 'styled-components/native';

const MyMessage = ({data}: any) => {
  // const [date, time] = data.time.split('T');
  // const [hour, minute, second] = time.split(':');
  return (
    <MyMessageDesign>
      {/* <SendTime>{`${hour}:${minute}`}</SendTime> */}
      <TextDesign>
        <MyMessageText>{data.message}</MyMessageText>
      </TextDesign>
    </MyMessageDesign>
  );
};

export default MyMessage;

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
  font-size: 14px;
  justify-content: center;
  padding: 5px 10px;
  color: #ffffff;
  max-width: 200px;
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
