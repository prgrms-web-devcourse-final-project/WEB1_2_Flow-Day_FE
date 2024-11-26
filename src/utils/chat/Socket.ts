import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// JWT 토큰 예시 (실제 토큰은 서버로부터 받아야 함)
const jwtToken = 'your-jwt-token';

let socket;

// STOMP 클라이언트 생성
const client = new Client({
  webSocketFactory: () => {
    // SockJS 엔드포인트 설정
    socket = new SockJS('http://your-server/sockjs');
    return socket;
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// 연결 이벤트 핸들러
client.onConnect = frame => {
  console.log('Connected:', frame);

  // 토픽 구독
  const subscription = client.subscribe('/topic/sports', message => {
    console.log('Received message:', message.body);
  });

  // 메시지 발행 (헤더에 인증 정보 추가)
  client.send(
    '/topic/sports',
    { Authorization: `Bearer ${jwtToken}` },
    'Hello, this is a message!',
  );
};

// 연결 실패 이벤트 핸들러
client.onStompError = frame => {
  console.error('Broker reported error:', frame.headers['message']);
  console.error('Additional details:', frame.body);

  // 실패 시 SockJS 다시 실행
  restartSockJS();
};

// 연결 해제 이벤트 핸들러
client.onDisconnect = frame => {
  console.log('Disconnected:', frame);
  // 연결 해제 시 수행할 추가 작업
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
