import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import SockJS from 'sockjs-client';
import { Client, Message } from '@stomp/stompjs';
import ChatInputText from '@/components/chat/ChatInputText';
import MyMessage from '@/components/chat/MyMessage';
import YourMessage from '@/components/chat/YourMessage';
import useChatStore from '@/store/chat/ChatStore';
import axios from 'axios';

// BASE_URL, JWT 등은 그대로 사용
const BASE_URL = 'https://flowday.kro.kr:80';

// 메시지 타입 정의
interface ChatMessage {
  senderId: number;
  content: string;
  timestamp: string;
}

// STOMP 클라이언트 관련 타입

const ChatPage = (): JSX.Element => {
  const { chatData, setChatData } = useChatStore(); // 채팅 데이터 상태
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const yourId = 1; // 현재 사용자의 ID
  const roomId = 3; // 방 ID (실제로 동적으로 설정해야 할 수 있음)
  const getTest = axios.get('${BASE_URL}');

  // 웹소켓 초기화 함수
  const initializeWebSocket = (): void => {
    const jwtToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImxvZ2luSWQiOiJ0ZXN0MTIzNCIsImNhdGVnb3J5IjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWQiOjV9LCJpYXQiOjE3MzMyNzY3NzksImV4cCI6MTczMzMxMjc3OX0.V3XTcNZ-mM17LfqeLUQquvpvO-A4fLgEhEcVXV96kYs';
    const socket = new SockJS(`${BASE_URL}/connect/websocket`);
    // console.log(socket);
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `${jwtToken}`,
      },
      // debug: str => console.log(str),
      onConnect: () => {
        setIsConnected(true);
        client.subscribe(`/topic/rooms/${roomId}`, message => {
          if (message.body) {
            const newMessage = JSON.parse(message.body);
          } else {
          }
        });
      },
    });

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

    // // SockJS 다시 실행 함수
    // function restartSockJS() {
    //   console.log('Attempting to restart SockJS...');
    //   socket = new SockJS('http://your-server/sockjs');
    //   client.webSocketFactory = () => socket;
    //   client.activate();
    // }
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
