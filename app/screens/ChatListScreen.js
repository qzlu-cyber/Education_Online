/*
 * @Author: 刘俊琪
 * @Date: 2022-04-12 16:22:22
 * @LastEditTime: 2022-04-14 10:14:05
 * @Description: 聊天列表
 */
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import io from "socket.io-client";
import moment from "moment";
import "dayjs/locale/zh-cn";

import usersApi from "../api/users";
import chatMessagesApi from "../api/chatMessages";
import colors from "../config/colors";

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 40;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const ChatListScreen = ({ route }) => {
  const user = route.params.user;

  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const Yscroll = React.useRef(new Animated.Value(0)).current;

  const [msgFrom, setMsgFrom] = useState([]);
  const [userNames, setUserNames] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [count, setCount] = useState(0);
  const [allUnReadCount, setAllUnReadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [socket, setSocket] = useState({});

  const navigation = useNavigation();

  const initIO = () => {
    if (!io.socket) {
      setSocket(io("http://192.168.31.52:3000"));
    }
  };

  const getMessagesList = async () => {
    try {
      const result = await chatMessagesApi.getMessagesList();
      const currentMsg = result.data.data.messagesData;
      const lastMessageObjs = {};
      const contactUser = [];
      currentMsg.map((msg) => {
        contactUser.push(msg.from); //push发送消息的用户id
        contactUser.push(msg.to); //push自己的id

        if (msg.to === user._id && !msg.read) {
          //对每条message进行统计，如果接收方是自己并且未读
          msg.unReadCount = 1; //将unReadCount设为1
        } else {
          msg.unReadCount = 0; //否则设为0
        }

        const chatId = msg.chat_id;
        const lastMessage = lastMessageObjs[chatId];

        if (!lastMessage) {
          lastMessageObjs[chatId] = msg;
        } else {
          const unReadCount = lastMessage.unReadCount + msg.unReadCount; //首先累加unReadCount = 已经统计的 + 当前msg的
          if (msg.createTime > lastMessage.createTime) {
            lastMessageObjs[chatId] = msg;
          }
          lastMessageObjs[chatId].unReadCount = unReadCount; // 将unReadCount保存在更新后的lastMessage中
        }
      });

      let lastMsgs = Object.values(lastMessageObjs);
      lastMsgs.sort((msg1, msg2) => {
        return msg2.createTime - msg1.createTime;
      });
      setLastMessages(lastMsgs);

      function uniq(arr) {
        return Array.from(new Set(arr));
      }
      setMsgFrom(uniq(contactUser).filter((id) => id !== user._id));
    } catch (error) {
      console.log(error);
    }
  };

  let unRead = 0;

  const readMessage = async (to) => {
    const result = await chatMessagesApi.readMessage(to);
    if (result.ok) {
      setCount(count + 1);
    }
  };

  const userNameArr = [];
  const getMsgFrom = async (id, index) => {
    const result = await usersApi.getUsers(id);
    userNameArr.push(result.data);
    if (msgFrom.length && index === msgFrom.length - 1) {
      setUserNames(userNameArr);
    }
  };

  const handlePress = async (item) => {
    const result = await chatMessagesApi.deleteMessages(item._id);
    console.log(item._id);
    if (result.ok) {
      setUserNames(userNames.filter((userName) => item._id !== userName._id));
    }
  };

  useEffect(() => {
    initIO();
  }, []);

  useEffect(() => {
    getMessagesList();
  }, [count]);

  useEffect(() => {
    msgFrom.map((id, index) => getMsgFrom(id, index));
  }, [msgFrom]);

  moment.updateLocale("zh-cn", {
    relativeTime: {
      future: "%s内",
      past: "%s前",
      s: "几秒",
      m: "1 分钟",
      mm: "%d 分钟",
      h: "1 小时",
      hh: "%d 小时",
      d: "1 天",
      dd: "%d 天",
      M: "1 个月",
      MM: "%d 个月",
      y: "1 年",
      yy: "%d 年",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={userNames}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const chatId = [item._id, user._id].sort().join("_");
          let content = "";
          let unReadCount = 0;
          let to;
          let time;
          lastMessages.map((lastMessage) => {
            if (lastMessage.chat_id === chatId) {
              content = lastMessage.content[0];
              time = moment(content.createdAt).fromNow();
              unReadCount = lastMessage.unReadCount;
              to = lastMessage.from;
            }
            unRead = unRead + lastMessage.unReadCount;
            setAllUnReadCount(unRead);
          });

          const scale = Yscroll.interpolate({
            inputRange: [-1, 0, sizeOfItem * index, sizeOfItem * (index + 2)],
            outputRange: [1, 1, 1, 0],
          });
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("聊天", {
                  userName: item.name,
                  user,
                  item,
                  socket,
                });
                readMessage(to);
              }}>
              <Animated.View
                style={[
                  styles.item,
                  {
                    transform: [{ scale }],
                  },
                ]}>
                <Image
                  style={styles.image}
                  source={{ uri: item.avatar }}
                  resizeMode='contain'
                  contentContainerStyle={{ padding: 20 }}
                />
                <View style={styles.wrapText}>
                  <Text style={styles.fontSize}>{item.name}</Text>
                  <Text style={{ fontSize: 14, marginTop: 5 }}>
                    {content.text ? content.text : "图片"}
                  </Text>
                </View>
                <View style={styles.messageInfo}>
                  <Text
                    style={{ fontSize: 12, color: "rgba(35, 35, 35, 0.3)" }}>
                    {time}
                  </Text>
                  {unReadCount !== 0 && (
                    <View
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 8,
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                        marginLeft: 20,
                      }}>
                      <Text style={{ fontSize: 12, color: colors.white }}>
                        {unReadCount}
                      </Text>
                    </View>
                  )}
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
          { useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fontSize: {
    fontSize: 16,
  },
  image: {
    width: 40,
    height: imgHeight,
    borderRadius: 20,
  },
  wrapText: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    marginBottom: marginBottomItem,
    backgroundColor: "#fff",
    padding: paddingItem,
  },
  container: {
    flex: 1,
  },
  messageInfo: {
    position: "absolute",
    right: 10,
    top: 10,
    flex: 1,
  },
});

export default ChatListScreen;
