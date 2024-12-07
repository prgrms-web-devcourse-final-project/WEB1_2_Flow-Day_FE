import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import useAlertStore from '@/store/alert/alert-store';
import AlertItemIcon from '@/components/alert/AlertItemIcon';
import AlertItemText from '@/components/alert/AlertItemText';
import AlertItemDate from '@/components/alert/AlertItemDate';
import { useNavigation } from '@react-navigation/native';

const AlertPage = () => {
  const { alerts } = useAlertStore();
  const navigation = useNavigation();
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
