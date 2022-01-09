/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 15:57:40
 * @LastEditTime: 2022-01-09 16:43:30
 * @Description: 我的页
 */
import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";

function MyScreen(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <AntDesign name='setting' size={28} color='black' />
      </TouchableOpacity>
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <AppText text='刘俊琪' style={styles.name} />
        <AppText text='哈哈哈' style={styles.welcome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    alignItems: "flex-end",
    position: "absolute",
    top: StatusBar.currentHeight + 50,
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
