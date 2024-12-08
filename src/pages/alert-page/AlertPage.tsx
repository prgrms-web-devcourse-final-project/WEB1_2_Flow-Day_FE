import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
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

const AlertPage = () => {
  const {alertList, addAlert, setAlertList, markAsRead} = useAlertStore();
  const navigation = useNavigation();
  const {accessToken, userId} = useStore();

  const domain = 'localhost:8090'; // 업데이트 예정!!!!!!! 업데이트 예정!!!!!!! 업데이트 예정!!!!!!!

  // 알림 페이지 입장 시 -> 알림 리스트 업데이트
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(`http://flowday.kro.kr:80/api/v1/notifications/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.data;
      console.log(data);
    };
  }, []);

  // 웹소켓 코드 =======================================
  useEffect(() => {
    const socket = new SockJS('http://flowday.kro.kr:80/connect'); // SockJS를 사용한 연결
    const stompClient = new Client({
      brokerURL: `ws://${domain}.com/ws`,
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      onConnect: () => {
        console.log('연결됐소');

        // 구독 설정
        stompClient.subscribe(`/topic/notifications/${receiverId}`);
      },
    });
  }, []);

  return (
    <AlertPageDesign>
      <AlertItemList>
        {alerts.map((alert, index) => {
          return (
            <AlertItem key={index}>
              <AlertItemIcon type={alert.type}></AlertItemIcon>
              <AlertItemText message={alert.message}></AlertItemText>
              <AlertItemDate createdAt={alert.createdAt}></AlertItemDate>
            </AlertItem>
          );
        })}
      </AlertItemList>
    </AlertPageDesign>
  );
};

export default AlertPage;

const AlertPageDesign = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const AlertItem = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  border: 1px solid #dddddd;
  margin: 0 auto;
`;

const AlertItemList = styled.ScrollView``;
