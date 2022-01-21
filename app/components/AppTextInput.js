/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 14:54:34
 * @LastEditTime: 2022-01-21 16:03:29
 * @Description: 输入框
 */
import React from "react";
import { StyleSheet, View, TextInput } from "react-native";

import AppText from "./AppText";

export default function AppTextInput({
  title,
  titleStyle,
  inputStyle,
  warningText,
  warnTextStyle,
  placeholder,
}) {
  return (
    <View style={styles.container}>
      {title && <AppText text={title} style={titleStyle} />}
      <TextInput style={inputStyle} placeholder={placeholder} />
      {warningText && <AppText text={warningText} style={warnTextStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
