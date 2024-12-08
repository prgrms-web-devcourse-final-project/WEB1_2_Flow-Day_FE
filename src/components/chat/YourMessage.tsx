import React from 'react';
import styled from 'styled-components/native';

const YourMessage = ({data}: any) => {
  // const [date, time] = data.time.split('T');
  // const [hour, minute, second] = time.split(':');
  return (
    <YourMessageDesign>
      <Profle source={require('../../assets/images/profile.png')} />
      <Boxs>
        <NicknameText>{`${'고길동'}`}</NicknameText>
        <TextDesign>
          <YourMessageText>{data.message}</YourMessageText>
        </TextDesign>
      </Boxs>
      {/* <SendTime>{`${hour}:${minute}`}</SendTime> */}
    </YourMessageDesign>
  );
};

export default YourMessage;

const YourMessageDesign = styled.View`
  margin-top: 10px;
  margin-right: auto;
  margin-left: 5px;
  justify-content: center;
  flex-direction: row;
`;

const Profle = styled.Image`
  width: 50px;
  height: 50px;
  margin: auto 0px;
`;

const Boxs = styled.View`
  flex-direction: column;
`;

const NicknameText = styled.Text`
  font-size: 14px;
  font-family: 'SCDream5';
`;

const TextDesign = styled.View`
  border: 1px solid #ffeadd;
  border-radius: 6px;
  background-color: #ffeadd;
  margin-top: 5px;
`;

const YourMessageText = styled.Text`
  font-size: 14px;
  justify-content: center;
  max-width: 200px;
  padding: 5px 10px;
  color: #000000;
`;

const SendTime = styled.Text`
  width: 30px;
  height: 20px;
  font-size: 10px;
  color: #7d7d7d;
  margin: auto 5px;
  margin-bottom: 0px;
  /* border: 1px solid black; */
  /* align-items: center; */
  justify-content: center;
`;
