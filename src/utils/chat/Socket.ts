// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// const BASE_URL = 'http://flowday.kro.kr:5000/api/v1';

// // JWT 토큰 예시 (실제 토큰은 서버로부터 받아야 함)
// const jwtToken =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InJvbGUiOiJST0xFX1VTRVIiLCJpZCI6NSwibG9naW5JZCI6InRlc3QxMjM0IiwiY2F0ZWdvcnkiOiJhY2Nlc3NUb2tlbiJ9LCJpYXQiOjE3MzMxMjY5MzUsImV4cCI6MTczMzEzMDUzNX0.hSnG4BQCVqPJitJ_LoVIJ3cvPgS8y0PdfVe4bRVZ_dQ';

// let socket;

// // STOMP 클라이언트 생성
// const client = new Client({
//   webSocketFactory: () => {
//     // SockJS 엔드포인트 설정
//     socket = new SockJS(`${BASE_URL}/connect/websocket`);
//     return socket;
//   },
//   reconnectDelay: 5000,
//   heartbeatIncoming: 4000,
//   heartbeatOutgoing: 4000,
// });

// // 연결 이벤트 핸들러
// client.onConnect = frame => {
//   console.log('웹소켓 연결됨 :', frame);

//   // 토픽 구독
//   const subscription = client.subscribe(
//     `${BASE_URL}/topic/rooms/{roomId}`,
//     message => {
//       console.log('전달받은 메시지 :', message.body);
//     },
//   );

//   // 메시지 발행 (헤더에 인증 정보 추가)
//   client.send(
//     `${BASE_URL}/chat/{roomId}`,
//     { Authorization: `Bearer ${jwtToken}` },
//     '보내는 메시지 내용!',
//   );
// };

// // 연결 실패 이벤트 핸들러
// client.onStompError = frame => {
//   console.error('Broker reported error:', frame.headers['message']);
//   console.error('Additional details:', frame.body);

//   // 실패 시 SockJS 다시 실행
//   // restartSockJS();
// };

// // 클라이언트 연결
// client.activate();

// /* ======================================  */

// // // 임의로 연결 해제를 원할 때 사용할 함수
// // function disconnect() {
// //   client.deactivate();
// // }

// // // 연결 해제 이벤트 핸들러
// // client.onDisconnect = frame => {
// //   console.log('Disconnected:', frame);
// //   // 연결 해제 시 수행할 추가 작업
// // };

// // // SockJS 다시 실행 함수
// // function restartSockJS() {
// //   console.log('Attempting to restart SockJS...');
// //   socket = new SockJS('/connect/websocket');
// //   client.webSocketFactory = () => socket;
// //   client.activate();
// // }
