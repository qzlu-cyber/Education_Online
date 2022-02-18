/*
 * @Author: 刘俊琪
 * @Date: 2022-02-18 15:43:52
 * @LastEditTime: 2022-02-18 18:48:01
 * @Description: 描述
 */
/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { StyleSheet, Text, Platform } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import "dayjs/locale/zh-cn";

import AccessoryBar from "../components/chat/AccessoryBar";
import CustomActions from "../components/chat/CustomActions";
import messagesData from "../components/chat/messages";
import earlierMessages from "../components/chat/earlierMessages";

const filterBotMessages = (message) =>
  !message.system && message.user && message.user._id && message.user._id === 2;

const findStep = (step) => (message) => message._id === step;

const user = {
  _id: 1,
  name: "Developer",
};

const otherUser = {
  _id: 2,
  name: "React Native",
  avatar: "https://facebook.github.io/react/img/logo_og.png",
};

export default class ChatScreen extends Component {
  state = {
    inverted: false,
    step: 0,
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    appIsReady: false,
    isTyping: false,
  };

  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    // init with only system messages
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
      isTyping: false,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              earlierMessages,
              Platform.OS !== "web"
            ),
            loadEarlier: true,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1500); // simulating network
  };

  onSend = (messages = []) => {
    const step = this.state.step + 1;
    this.setState((previousState) => {
      const sentMessages = [{ ...messages[0], sent: true }];
      console.log(sentMessages);
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== "web"
        ),
        step,
      };
    });
  };

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  onReceive = (text) => {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(
          previousState.messages,
          [
            {
              _id: Math.round(Math.random() * 1000000),
              text,
              createdAt: new Date(),
              user: otherUser,
            },
          ],
          Platform.OS !== "web"
        ),
      };
    });
  };

  onSendFromUser = (messages) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    this.onSend(messagesToUpload);
    console.log(messagesToUpload);
  };

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />;

  renderCustomActions = (props) =>
    Platform.OS === "web" ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    );

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "black",
          },
          left: {
            color: "black",
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#95ec69",
          },
          left: {
            backgroundColor: "white",
          },
        }}
      />
    );
  };

  renderSend = (props) => (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <MaterialIcons size={30} color={"tomato"} name={"send"} />
    </Send>
  );

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        user={user}
        scrollToBottom
        onLongPressAvatar={(user) => alert(JSON.stringify(user))}
        onPressAvatar={() => alert("short press")}
        keyboardShouldPersistTaps='never'
        renderAccessory={Platform.OS === "web" ? null : this.renderAccessory}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        inverted={Platform.OS !== "web"}
        timeTextStyle={{ left: { color: "red" }, right: { color: "yellow" } }}
        infiniteScroll
      />
    );
  }
}
