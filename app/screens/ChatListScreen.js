/*
 * @Author: 刘俊琪
 * @Date: 2022-04-12 16:22:22
 * @LastEditTime: 2022-04-12 17:12:10
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

import colors from "../config/colors";

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 40;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const BASE_URL = "https://dummyapi.io/data/v1";
const APP_ID = "6255389fd7e958bbab570917";

const ChatListScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const Yscroll = React.useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const getAllUsers = () => {
    fetch(`${BASE_URL}/user`, { headers: { "app-id": APP_ID } })
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson.data);
      })
      .catch(console.error)
      .finally(() => setIsloading(false));
  };

  useEffect(() => {
    setIsloading(true);
    getAllUsers();
    return () => {};
  }, []);

  const renderUser = ({ item, index }) => {
    const scale = Yscroll.interpolate({
      inputRange: [-1, 0, sizeOfItem * index, sizeOfItem * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("聊天", {
            userName: `${item.title} ${item.firstName} ${item.lastName}`,
          })
        }>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{ scale }],
            },
          ]}>
          <Image
            style={styles.image}
            source={{ uri: item.picture }}
            resizeMode='contain'
            contentContainerStyle={{ padding: 20 }}
          />
          <View style={styles.wrapText}>
            <Text
              style={
                styles.fontSize
              }>{`${item.title} ${item.firstName} ${item.lastName}`}</Text>
            <Text style={{ fontSize: 14, marginTop: 5 }}>文字消息</Text>
          </View>
          <View style={styles.messageInfo}>
            <Text style={{ fontSize: 12, color: "rgba(35, 35, 35, 0.3)" }}>
              1小时前
            </Text>
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
              <Text style={{ fontSize: 12, color: colors.white }}>1</Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => `key-${item.id}`}
          renderItem={renderUser}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
            { useNativeDriver: true }
          )}
        />
      )}
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
