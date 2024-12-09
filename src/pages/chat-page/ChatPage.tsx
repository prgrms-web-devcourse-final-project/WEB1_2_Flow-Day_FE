import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import SockJS from 'sockjs-client';
import {Client, Message} from '@stomp/stompjs';
import MyMessage from '@/components/chat/MyMessage';
import YourMessage from '@/components/chat/YourMessage';
import useChatStore from '@/store/chat/ChatStore';
import axios from 'axios';
import {useStore} from '@/store/useStore';
import {REACT_APP_SERVER_URL} from '@env';
import PostHeader from '@/components/post/PostHeader';

// 채팅 메시지 타입 정의
interface ChatMessage {
  senderId: number; // 메시지 송신자 ID
  message: string; // 메시지 내용
  sendTime: string; // 메시지 전송 시간
}

const ChatPage = (): JSX.Element => {
  const {chatData, setMessage} = useChatStore(); // 전역 상태에서 채팅 데이터 가져오기
  const {userId, roomId, accessToken, setRommId} = useStore();

  // 상태 변수 타입 정의
  const [connected, setConnected] = useState<boolean>(false); // WebSocket 연결 상태
  const [input, setInput] = useState<string>(''); // 입력된 메시지 상태
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const clientRef = useRef<Client | null>(null); // STOMP 클라이언트를 참조하는 useRef

  useEffect(() => {
    const getRoomId = async () => {
      try {
        const res = await axios.get(`${REACT_APP_SERVER_URL}/members/`, {
          headers: {Authorization: `Bearer ${accessToken}`},
        });
        const newRoomId = await res.data.chattingRoom;

        console.log('roomId:', newRoomId);
        setRommId(+newRoomId);
      } catch (err) {
        console.error('룸 아이디 에러 :', err);
      }
    };
    getRoomId();
  }, [accessToken]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get(`http://flowday.kro.kr:80/api/v1/chat/${roomId}?page=${pageNumber}&size=20`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = (await res).data;
        // console.log('==========getChat Data ==========');
        // console.log(data.data);
        setMessage(data.data);
      } catch (err) {
        console.error('채팅 로그 요청 에러:', err);
      }
    };
    getChat();
  }, [setRommId, input]);

  // WebSocket 연결 및 STOMP 클라이언트 설정
  useEffect(() => {
    const socket = new SockJS('http://flowday.kro.kr:80/connect'); // SockJS를 사용한 연결
    const stompClient = new Client({
      brokerURL: 'ws://flowday.kro.kr:/connect/websocket', // STOMP 브로커 URL
      // connectHeaders: {
      //   'Access-Control-Allow-Origin': 'http://localhost:3000', // CORS 허용
      // },
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      onConnect: () => {
        // WebSocket 연결이 성공적으로 이루어진 후 호출
        setConnected(true);
        console.log('===== 웹소켓 연결 완료되었습니다 =====');

        // 채팅방에 대한 메시지 구독 설정
        stompClient.subscribe(`/topic/rooms/${roomId}`, (message) => {
          const body = JSON.parse(message.body); // 서버에서 온 메시지 파싱
          console.log('채팅방 구독 설정 : ', body);
        });
      },
      onDisconnect: () => {
        // WebSocket 연결이 끊어졌을 때 호출
        console.log('===== 웹소켓 연결이 끊어졌습니다! =====');
        setConnected(false);
      },
      onStompError: (frame) => {
        // STOMP 에러 처리
        console.error('STOMP Error:', frame.headers['message']);
      },
      onWebSocketClose: () => {
        // WebSocket이 닫힐 때 호출
        setConnected(false);
      },
      // debug: str => console.log('디버거:', str), // 디버그 메시지 출력
    });

    stompClient.activate(); // STOMP 클라이언트 활성화
    clientRef.current = stompClient; // STOMP 클라이언트 참조 저장

    // 컴포넌트 언마운트 시 STOMP 클라이언트 비활성화
    return () => stompClient.deactivate();
  }, [roomId]); // roomId가 변경될 때마다 effect 실행

  // 메시지 전송 함수
  const sendMessage = (): void => {
    if (clientRef.current && input.trim() !== '' && connected) {
      // WebSocket이 연결되어 있고 입력된 메시지가 있을 때
      const chatMessage = {
        message: input, // 전송할 메시지
        senderId: userId,
      };
      clientRef.current.publish({
        destination: `/app/chat/${roomId}`, // 메시지를 보낼 목적지
        body: JSON.stringify(chatMessage), // 메시지 본문
      });
      setInput(''); // 메시지 전송 후 입력란 초기화
    } else {
      console.log('웹소켓 연결이 안되어있어, 메시지를 보낼 수 없습니다.'); // 연결되지 않은 상태에서 메시지 전송 시
    }
  };

  const renderItem = ({item}: {item: ChatMessage}) => {
    if (item?.senderId) {
      return item.senderId === +userId ? <MyMessage data={item} /> : <YourMessage data={item} />;
    }
  };

  return (
    <ChatDesign>
      <FlatList
        data={chatData} // 채팅 데이터 배열을 전달
        renderItem={renderItem} // 각 항목을 렌더링할 컴포넌트
        keyExtractor={(item, index) => index.toString()} // 각 항목의 고유 키를 제공
        inverted // 메시지가 아래에서 위로 스크롤되도록 설정
      />
      <StyleBox>
        <ChatInputText
          value={input}
          onChangeText={(text) => setInput(text)} // TextInput에 입력된 값을 상태로 업데이트
          placeholder='텍스트를 입력해주세요'
          onSubmitEditing={sendMessage} // 엔터키를 누르면 메시지 전송
          returnKeyType='send' // iOS에서 키보드 'Send' 버튼으로 표시
          blurOnSubmit={false} // 메시지 전송 후 포커스를 유지
        ></ChatInputText>
        <SubmitButton onPress={sendMessage}>
          <SubmitButtonText>전송</SubmitButtonText>
        </SubmitButton>
      </StyleBox>
    </ChatDesign>
  );
};

export default ChatPage;

// Styled components
// 전체 채팅 화면 디자인
const ChatDesign = styled.View`
  flex: 1;
  width: 100%;
  height: 500px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #eeeeee;
  background-color: #fff;
`;

// 채팅 메시지를 표시할 리스트 컴포넌트
const ChatInputText = styled.TextInput`
  width: 325px;
  height: 50px;
  border: 1px solid #ff6666;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 5px;
  margin-right: auto;
  text-align: left; /* 텍스트를 왼쪽으로 정렬 */
`;

const SubmitButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  background-color: #ff6666;
  color: #ffffff;
  font-size: 14px;
  margin: auto 0px;
  margin-right: 5px;
  border-radius: 6px;
`;

const SubmitButtonText = styled.Text`
  text-align: center;
  margin: auto;
  width: 100%;
  color: #ffffff;
`;

const StyleBox = styled.View`
  flex-direction: row;
`;
