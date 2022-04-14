/*
 * @Author: 刘俊琪
 * @Date: 2022-02-18 15:43:52
 * @LastEditTime: 2022-04-14 14:13:10
 * @Description: 描述
 */
/* eslint-disable prettier/prettier */
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";

import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import "dayjs/locale/zh-cn";

import AccessoryBar from "../components/chat/AccessoryBar";
import CustomActions from "../components/chat/CustomActions";

import chatMessagesApi from "../api/chatMessages";

export default function ChatScreen({ route }) {
  const [messages, setMessages] = useState([]);

  const user = {
    _id: route.params.user._id,
    name: route.params.user.name,
  };

  const otherUser = {
    _id: route.params.item._id,
    name: route.params.item.name,
  };

  const getMessagesList = async () => {
    const result = await chatMessagesApi.getMessagesList();
    const userChat_id = [route.params.user._id, route.params.item._id]
      .sort()
      .join("_");
    const our = result.data.data.messagesData.filter(
      (message) => message.chat_id === userChat_id
    );
    let messages = [];
    for (let i = 0; i < our.length; i++) {
      messages.unshift(our[i].content[0]);
    }
    setMessages(messages);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    route.params.socket.emit("sendMessage", {
      from: route.params.user._id,
      to: otherUser._id,
      content: messages,
    });
  }, []);

  const onReceive = useCallback(() => {
    route.params.socket.on("recieveMessage", (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      );
    });
  }, []);

  const onSendFromUser = (messages) => {
    const createdAt = new Date();
    const messagesToUpload = messages.map((message) => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }));
    onSend(messagesToUpload);
  };

  const renderAccessory = () => <AccessoryBar onSend={onSendFromUser} />;

  const renderCustomActions = (props) =>
    Platform.OS === "web" ? null : (
      <CustomActions {...props} onSend={onSendFromUser} />
    );

  const renderBubble = (props) => {
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

  const renderSend = (props) => (
    <Send {...props} containerStyle={{ justifyContent: "center" }}>
      <MaterialIcons size={30} color={"tomato"} name={"send"} />
    </Send>
  );

  useEffect(() => {
    route.params.socket.emit("login", user._id);
  }, []);

  useEffect(() => {
    getMessagesList();
  }, []);

  useEffect(() => {
    onReceive();
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={user}
      scrollToBottom
      keyboardShouldPersistTaps='never'
      renderAccessory={Platform.OS === "web" ? null : renderAccessory}
      renderActions={renderCustomActions}
      renderBubble={renderBubble}
      renderSend={renderSend}
      inverted={Platform.OS !== "web"}
      timeTextStyle={{ left: { color: "red" }, right: { color: "yellow" } }}
      infiniteScroll
    />
  );
}
// export default class ChatScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       step: 0,
//       messages: [],
//       socket: {},
//     };
//   }

//   user = {
//     _id: this.props.route.params.user._id,
//     name: this.props.route.params.user.name,
//   };

//   otherUser = {
//     _id: this.props.route.params.item._id,
//     name: this.props.route.params.item.name,
//     avatar: this.props.route.params.item.avatar,
//   };

//   getMessagesList = async () => {
//     const result = await chatMessagesApi.getMessagesList();
//     const userChat_id = [
//       this.props.route.params.user._id,
//       this.props.route.params.item._id,
//     ]
//       .sort()
//       .join("_");
//     const our = result.data.data.messagesData.filter(
//       (message) => message.chat_id === userChat_id
//     );
//     let messages = [];
//     for (let i = 0; i < our.length; i++) {
//       messages.unshift(our[i].content[0]);
//     }
//     this.setState({
//       messages: messages,
//       appIsReady: true,
//       isTyping: false,
//     });
//   };

//   componentDidMount() {
//     this.setState({
//       socket: this.props.route.params.socket,
//     });
//     // init with only system messages
//     this.getMessagesList();
//   }

//   onSend = (messages = []) => {
//     const step = this.state.step + 1;
//     this.setState((previousState) => {
//       const sentMessages = [{ ...messages[0], sent: true }];
//       return {
//         messages: GiftedChat.append(
//           previousState.messages,
//           sentMessages,
//           Platform.OS !== "web"
//         ),
//         step,
//       };
//     });
//     this.state.socket.emit("sendMessage", {
//       from: this.props.route.params.user._id,
//       to: this.otherUser._id,
//       content: messages,
//     });
//   };

//   renderCustomView(props) {
//     return <CustomView {...props} />;
//   }

//   onReceive = (message) => {
//     this.setState((previousState) => {
//       // console.log(previousState);
//       return {
//         messages: GiftedChat.append(
//           previousState.messages,
//           message,
//           Platform.OS !== "web"
//         ),
//       };
//     });
//   };

//   onSendFromUser = (messages) => {
//     const user = this.user;
//     const createdAt = new Date();
//     const messagesToUpload = messages.map((message) => ({
//       ...message,
//       user,
//       createdAt,
//       _id: Math.round(Math.random() * 1000000),
//     }));
//     this.onSend(messagesToUpload);
//   };

//   renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />;

//   renderCustomActions = (props) =>
//     Platform.OS === "web" ? null : (
//       <CustomActions {...props} onSend={this.onSendFromUser} />
//     );

//   renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         textStyle={{
//           right: {
//             color: "black",
//           },
//           left: {
//             color: "black",
//           },
//         }}
//         wrapperStyle={{
//           right: {
//             backgroundColor: "#95ec69",
//           },
//           left: {
//             backgroundColor: "white",
//           },
//         }}
//       />
//     );
//   };

//   renderSend = (props) => (
//     <Send {...props} containerStyle={{ justifyContent: "center" }}>
//       <MaterialIcons size={30} color={"tomato"} name={"send"} />
//     </Send>
//   );

//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={this.onSend}
//         user={this.user}
//         scrollToBottom
//         keyboardShouldPersistTaps='never'
//         renderAccessory={Platform.OS === "web" ? null : this.renderAccessory}
//         renderActions={this.renderCustomActions}
//         renderBubble={this.renderBubble}
//         renderSend={this.renderSend}
//         shouldUpdateMessage={() => {
//           this.state.socket.on("recieveMessage", (message) => {
//             this.onReceive(message);
//           });
//         }}
//         inverted={Platform.OS !== "web"}
//         timeTextStyle={{ left: { color: "red" }, right: { color: "yellow" } }}
//         infiniteScroll
//       />
//     );
//   }
// }
