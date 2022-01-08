/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:35:16
 * @LastEditTime: 2022-01-08 10:41:42
 * @Description: 按钮
 */
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import AppText from "./AppText";

function AppButton({ style, title, textStyle }) {
  return (
    <TouchableOpacity style={[styles.button, style]}>
      <AppText text={title} style={textStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
  },
});

export default AppButton;
