/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:08:00
 * @LastEditTime: 2022-01-08 10:31:31
 * @Description: 文字组件
 */
import React from "react";
import { Platform, Text, StyleSheet } from "react-native";

function AppText({ text, style }) {
  return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Robot",
  },
});

export default AppText;
