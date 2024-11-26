import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import DateDisplay from '@/components/chat/DateDisplay';
import ChatInputText from '@/components/chat/ChatInputText';
import MyMessage from '@/components/chat/MyMessage';
import YourMessage from '@/components/chat/YourMessage';

// ChatDesign : 채팅 페이지 화면의 가장 큰 틀
const ChatDesign = styled.View`
  flex: 1;
  width: 100%;
  height: 500px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #eeeeee;
`;

const ChatList = styled.FlatList``;

const ChatPage = () => {
  const MyMessageItem = ({ item }) => {
    return <MyMessage message={item} />;
  };
  const YourMessageItem = ({ item }) => {
    return <YourMessage message={item} />;
  };

  return (
    <ChatDesign>
      <ChatList
        data={messages}
        renderItem={MyMessageItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<DateDisplay />}
        ListFooterComponent={<ChatInputText />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <ChatList
        data={messages}
        renderItem={YourMessageItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<ChatInputText />}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </ChatDesign>
  );
};

export default ChatPage;
