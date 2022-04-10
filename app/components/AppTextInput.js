/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 14:54:34
 * @LastEditTime: 2022-04-10 18:31:47
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
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
}) {
  return (
    <View style={styles.container}>
      {title && <AppText text={title} style={titleStyle} />}
      <TextInput
        value={value}
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {warningText && <AppText text={warningText} style={warnTextStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
