import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components/native';
import useAlertStore from '@/store/alert/alert-store';
import AlertItemIcon from '@/components/alert/AlertItemIcon';
import AlertItemText from '@/components/alert/AlertItemText';
import AlertItemDate from '@/components/alert/AlertItemDate';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useStore} from '@/store/useStore';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IAlert} from '@/store/alert/alert-store';
import PostDetailPage from '../post-detail-page/PostDetailPage';

const AlertPage = () => {
  // 스토어
  const {alertList, addAlert, setAlertList, markAsRead} = useAlertStore();
  const {accessToken, userId} = useStore();
  const navigation = useNavigation();

  // 상태 & 변수
  const domain = 'flowday.kro.kr:80'; // 업데이트 예정!!!!!!! 업데이트 예정!!!!!!! 업데이트 예정!!!!!!!
  const clientRef = useRef<Client | null>(null); // STOMP 클라이언트를 참조하는 useRef

  // 알림 페이지 입장 시 -> 알림 리스트 업데이트
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(`http://flowday.kro.kr:80/api/v1/notifications/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.data.content;
      setAlertList(data);
      console.log('===== 알림 데이터 =====');
      console.log(data);
      setAlertList(data);
    };
    getNotifications();
  }, [accessToken, userId]);

  // navigationRef.navigate('AlertPage');
  // 웹소켓 코드 =======================================
  // useEffect(() => {
  //   const socket = new SockJS('http://flowday.kro.kr:80/connect'); // SockJS를 사용한 연결
  //   const stompClient = new Client({
  //     brokerURL: `ws://${domain}/ws`,
  //     forceBinaryWSFrames: true,
  //     appendMissingNULLonIncoming: true,
  //     onConnect: () => {
  //       console.log('연결됐소');

  //       // 구독 설정
  //       stompClient.subscribe(`/topic/notifications/${userId}`, (alert) => {
  //         const data = JSON.parse(alert.body);
  //         console.log('========  data  =========');
  //         console.log(data);
  //       });
  //     },
  //     onDisconnect: () => {
  //       console.log(' ==== 웹소켓 끊긴다 ====');
  //     },
  //     onStompError: (frame) => {
  //       console.error('StompJS 에러 :', frame.headers['message']);
  //     },
  //     onWebSocketClose: () => {
  //       console.log(' ==== 웹소켓 닫힌다 ====');
  //     },
  //     debug: (str) => console.log('디버그:', str),
  //   });

  //   stompClient.activate();
  //   clientRef.current = stompClient;
  //   return () => stompClient.deactivate();
  // }, []);

  const switchType = (type: string) => {
    switch (type) {
      case 'COMMENT':
        return 'PostDetailPage';
      case 'LIKE':
        return 'PostDetailPage';
      case 'COUPLE':
        return 'PostDetailPage';
      case 'VOTE':
        return 'MapPage';
      case 'COURSE':
        return 'MapPage';
      default:
        return 'Home';
    }
  };

  return (
    <AlertPageDesign>
      <FlatList
        data={alertList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <AlertItem
            key={index}
            onPress={() => {
              console.log(switchType(item.type));
              navigation.navigate(switchType(item.type));
            }}
          >
            <AlertItemIcon type={item.type}></AlertItemIcon>
            <AlertItemText message={item.message}></AlertItemText>
            <AlertItemDate createdAt={item.createdAt}></AlertItemDate>
          </AlertItem>
        )}
      />
    </AlertPageDesign>
  );
};

export default AlertPage;

const AlertPageDesign = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const AlertItem = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 60px;
  border: 1px solid #dddddd;
  margin: 0 auto;
`;

const FlatList = styled.FlatList`
  width: 100%;
  height: 100%;
`;
