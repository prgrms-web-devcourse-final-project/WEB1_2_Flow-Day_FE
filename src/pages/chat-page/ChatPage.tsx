import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import DateDisplay from '@/components/chat/DateDisplay';
import ChatInputText from '@/components/chat/ChatInputText';
import MyMessage from '@/components/chat/MyMessage';
import YourMessage from '@/components/chat/YourMessage';
import useChatStore from '@/store/chat/ChatStore';

// BASE_URL, JWT 등은 그대로 사용
const BASE_URL = 'http://flowday.kro.kr:5000/api/v1';

const jwtToken = '';

// 메시지 타입 정의
interface ChatMessage {
  senderId: number;
  content: string;
  timestamp: string;
}

// STOMP 클라이언트 관련 타입
let socket: SockJS | null = null;
let client: Client | null = null;

// WebSocket 초기화 함수
const initializeWebSocket = (): void => {
  client = new Client({
    webSocketFactory: () => {
      socket = new SockJS(`${BASE_URL}/connect/websocket`);
      return socket;
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  // 연결 이벤트 핸들러
  client.onConnect = (frame: any): void => {
    console.log('웹소켓 연결됨 :', frame);

    // 토픽 구독
    client?.subscribe(
      `${BASE_URL}/topic/rooms/{roomId}`,
      (message: Message) => {
        console.log('전달받은 메시지 :', message.body);
        // 메시지가 도착하면 채팅 화면에 추가
        addMessageToChat(message.body);
      },
    );

    // 메시지 발행 (헤더에 인증 정보 추가)
    client.send(
      `${BASE_URL}/chat/{roomId}`,
      { Authorization: jwtToken },
      '보내는 메시지 내용!',
    );
  };

  // 연결 실패 이벤트 핸들러
  client.onStompError = (frame: any): void => {
    console.error('Broker reported error:', frame.headers['message']);
    console.error('Additional details:', frame.body);
  };

  // 클라이언트 연결
  client.activate();
};

// 메시지 데이터를 상태에 반영하는 함수
const addMessageToChat = (messageBody: string): void => {
  setChatData((prevMessages: ChatMessage[]) => [
    ...prevMessages,
    { senderId: 2, content: messageBody, timestamp: new Date().toISOString() },
  ]);
};

const ChatPage = (): JSX.Element => {
  const { chatData, setChatData } = useChatStore(); // 채팅 데이터 상태
  const [message, setMessage] = useState<string>(''); // 메시지 상태
  const yourId = 1;

  console.log(jwtToken);

  // 웹소켓 초기화 (컴포넌트가 마운트될 때 한 번만 실행)
  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (client) {
        client.deactivate(); // 컴포넌트 언마운트 시 웹소켓 연결 종료
      }
    };
  }, []);

  // 메시지 보내기 함수
  const sendMessage = (): void => {
    if (message.trim() === '') return;
    client?.send(
      `${BASE_URL}/chat/{roomId}`,
      { Authorization: jwtToken },
      message,
    );
    setMessage(''); // 메시지 전송 후 입력창 비우기
  };

  return (
    <ChatDesign>
      <Text></Text>
      <ChatList>
        {chatData.map((data, i) => {
          return data.senderId === yourId ? (
            <MyMessage data={data} key={i} />
          ) : (
            <YourMessage data={data} key={i} />
          );
        })}
      </ChatList>
      <ChatInputText
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </ChatDesign>
  );
};

export default ChatPage;

// Styled components의 타입도 추가
const ChatDesign = styled.View`
  flex: 1;
  width: 100%;
  height: 500px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #eeeeee;
`;

const ChatList = styled.ScrollView`
  flex: 1;
  width: 100%;
  height: 100%;
`;
