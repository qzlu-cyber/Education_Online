/*
 * @Author: 刘俊琪
 * @Date: 2022-01-20 12:24:58
 * @LastEditTime: 2022-01-20 12:24:58
 * @Description: 历史浏览界面
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";

function HistoryScreen(props) {
  return (
    <View style={styles.container}>
      <AppText text='历史浏览' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HistoryScreen;
