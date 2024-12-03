import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import ChatInputText from '@/components/chat/ChatInputText';
import MyMessage from '@/components/chat/MyMessage';
import YourMessage from '@/components/chat/YourMessage';
import useChatStore from '@/store/chat/ChatStore';

// BASE_URL, JWT 등은 그대로 사용
const BASE_URL = 'http://flowday.kro.kr:5000';

const jwtToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJsb2dpbklkIjoidGVzdDEyMzQiLCJpZCI6NSwicm9sZSI6IlJPTEVfVVNFUiJ9LCJpYXQiOjE3MzMyMDgxMDEsImV4cCI6MTczMzI0NDEwMX0.ZXVKD15J4kuElzZSE6KiUesViErJkK8y3L6icL4uIcs'; // JWT 토큰을 여기에 설정하세요.

// 메시지 타입 정의
interface ChatMessage {
  senderId: number;
  content: string;
  timestamp: string;
}

// STOMP 클라이언트 관련 타입
let socket: SockJS;
let client: Client;

const ChatPage = (): JSX.Element => {
  const { chatData, setChatData } = useChatStore(); // 채팅 데이터 상태
  const [message, setMessage] = useState<string>(''); // 메시지 상태
  const yourId = 1; // 현재 사용자의 ID
  const roomId = 3; // 방 ID (실제로 동적으로 설정해야 할 수 있음)

  // 웹소켓 초기화 함수
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

    console.log(client);
    // 연결 이벤트 핸들러
    client.onConnect = (frame: any) => {
      console.log('웹소켓 연결성공 :', frame);

      // 토픽 구독 (roomId를 동적으로 대체)
      client.subscribe(
        `${BASE_URL}/topic/rooms/${roomId}`,
        (message: Message) => {
          console.log('전달받은 메시지 :', message.body);
          addMessageToChat(message.body);
        },
      );
    };

    // 연결 실패 이벤트 핸들러
    client.onStompError = (frame: any): void => {
      console.error('Broker reported error:', frame.headers['message']);
      console.error('Additional details:', frame.body);
    };

    // 클라이언트 연결
    client.activate();

    // 임의로 연결 해제를 원할 때 사용할 함수
    function disconnect() {
      client.deactivate();
    }

    // SockJS 다시 실행 함수
    function restartSockJS() {
      console.log('Attempting to restart SockJS...');
      socket = new SockJS('http://your-server/sockjs');
      client.webSocketFactory = () => socket;
      client.activate();
    }
  };

  // 메시지 데이터를 상태에 반영하는 함수
  const addMessageToChat = (messageBody: string): void => {
    setChatData((prevMessages: ChatMessage[]) => [
      ...prevMessages,
      {
        senderId: 2,
        content: messageBody,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 메시지 보내기 함수
  const sendMessage = (): void => {
    if (message.trim() === '') return;
    client.publish({
      destination: `${BASE_URL}/chat/${roomId}`, // roomId를 동적으로 설정
      headers: { Authorization: jwtToken },
      body: message,
    });
    setMessage(''); // 메시지 전송 후 입력창 비우기
  };

  initializeWebSocket();
  // 컴포넌트 마운트 시 웹소켓 초기화
  useEffect(() => {}, []);

  return (
    <ChatDesign>
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

// Styled components
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
