/*
 * @Author: 刘俊琪
 * @Date: 2022-01-24 18:37:58
 * @LastEditTime: 2022-02-18 16:07:22
 * @Description: 评论组件
 */
import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

export default function AppComment({
  nickName,
  avatar,
  content,
  star,
  navigation,
}) {
  let stars = [false, false, false, false, false];
  for (let i = 0; i < star; i++) {
    stars[i] = true;
  }
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigation.navigate("聊天", { userName: nickName })}>
          <Image source={avatar} style={styles.avatar} />
          <AppText text={nickName} style={styles.content} />
        </TouchableOpacity>
        <View style={styles.star}>
          {stars.map((star, index) => {
            if (star)
              return (
                <Foundation
                  name='star'
                  size={16}
                  color={colors.sign}
                  style={styles.icon}
                  key={index}
                />
              );
            else
              return (
                <Foundation
                  name='star'
                  size={16}
                  color={colors.lightText}
                  style={styles.icon}
                  key={index}
                />
              );
          })}
        </View>
      </View>
      <AppText text={content} style={styles.content} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  star: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 1,
  },
  content: {
    fontSize: 16,
    color: colors.lightText,
  },
});
