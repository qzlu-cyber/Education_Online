/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 15:57:40
 * @LastEditTime: 2022-04-10 18:16:58
 * @Description: 我的页
 */
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import useAuth from "../auth/useAuth";

import AppText from "../components/AppText";
import colors from "../config/colors";
import MyDetailNavigator from "../navigation/MyDetailNavigator";

function MyScreen({ navigation }) {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("设置")}>
        <AntDesign name='setting' size={28} color='black' />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => navigation.navigate("个人信息")}>
          <Image
            source={{
              uri:
                user.avatar.length > 100
                  ? `data:image/jpeg;base64,${user.avatar}`
                  : user.avatar,
            }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <AppText text={user.name} style={styles.name} />
        <AppText text={user.signature} style={styles.welcome} />
      </View>
      <MyDetailNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  icon: {
    alignItems: "flex-end",
    position: "absolute",
    top: "7%",
    right: 20,
    zIndex: 1,
  },
  header: {
    width: "100%",
    height: 150,
    backgroundColor: colors.praimary,
    marginBottom: 50,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    bottom: -100,
  },
  textContainer: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: colors.boldText,
    fontSize: 26,
    marginBottom: 5,
    letterSpacing: 1,
  },
  welcome: {
    color: colors.lightText,
    fontSize: 18,
  },
});

export default MyScreen;
