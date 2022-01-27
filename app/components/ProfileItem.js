/*
 * @Author: 刘俊琪
 * @Date: 2022-01-27 17:54:08
 * @LastEditTime: 2022-01-27 18:06:41
 * @Description: 个人信息项
 */
import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";

import AppText from "./AppText";

const windowWidth = Dimensions.get("window").width;

export default function ProfileItem({ text, avatar }) {
  return (
    <View style={styles.container}>
      <AppText text={text} style={styles.item} />
      {avatar && (
        <Image source={require("../assets/avatar.jpg")} style={styles.avatar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: windowWidth,
    borderBottomWidth: 1,
    backgroundColor: "lightblue",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
