/*
 * @Author: 刘俊琪
 * @Date: 2022-02-18 15:43:52
 * @LastEditTime: 2022-04-13 18:51:28
 * @Description: 描述
 */
/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import { Text, Platform } from "react-native";
import io from "socket.io-client";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import "dayjs/locale/zh-cn";

import AccessoryBar from "../components/chat/AccessoryBar";
import CustomActions from "../components/chat/CustomActions";
import earlierMessages from "../components/chat/earlierMessages";

import chatMessagesApi from "../api/chatMessages";

function initIO() {
  if (!io.socket) {
    return io("http://192.168.31.52:3000");
  }
}

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inverted: false,
      step: 0,
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      appIsReady: false,
      isTyping: false,
    };
  }

  _isMounted = false;

  user = {
    _id: this.props.route.params.user._id,
    name: this.props.route.params.user.name,
  };

  otherUser = {
    _id: this.props.route.params.item._id,
    name: this.props.route.params.item.name,
    avatar: this.props.route.params.item.avatar,
  };

  getMessagesList = async () => {
    const result = await chatMessagesApi.getMessagesList();
    const userChat_id = [
      this.props.route.params.user._id,
      this.props.route.params.item._id,
    ]
      .sort()
      .join("_");
    const our = result.data.data.messagesData.filter(
      (message) => message.chat_id === userChat_id
    );
    let messages = [];
    for (let i = 0; i < our.length; i++) {
      messages.unshift(our[i].content[0]);
    }
    this.setState({
      messages: messages,
      appIsReady: true,
      isTyping: false,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    // init with only system messages
    this.getMessagesList();
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
    const socket = initIO();
    socket.emit("sendMessage", {
      from: this.props.route.params.user._id,
      to: this.otherUser._id,
      content: messages,
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
    const user = this.user;
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    this.onSend(messagesToUpload);
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
        user={this.user}
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
