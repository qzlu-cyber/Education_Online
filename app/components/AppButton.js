/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:35:16
 * @LastEditTime: 2022-01-21 18:38:22
 * @Description: 按钮
 */
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import AppText from "./AppText";

function AppButton({ style, title, textStyle, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <AppText text={title} style={[styles.text, textStyle]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
  },
  text: {},
});

export default AppButton;
