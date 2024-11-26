import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components/native';

type HeaderProps = {
  children: React.ReactNode;
}

const Container = styled.View`
  background-color: '#FFFFFF';
  padding: 16px 14px;
  flex-direction: row;
  justify-content: space-between;
`

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    fontSize: 16
  },
  icon: {
    width: 24,
    height: 24
  }
});


export default function Header({children}: HeaderProps) {
  return (
    <Container>
      <Image source={require('../assets/logo.svg')} />
      <Text style={styles.text}>{children}</Text>
      <Image style={styles.icon} source={require('../assets/icons/alert.svg')} />
    </Container>
  );
}