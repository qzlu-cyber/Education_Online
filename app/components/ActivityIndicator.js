/*
 * @Author: 刘俊琪
 * @Date: 2020-08-03 11:49:09
 * @LastEditTime: 2022-04-08 08:19:36
 * @Description: 首页加载动画
 */
import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

export default function ActivityIndicator({ visiable = false }) {
  if (!visiable) return null;
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../assets/animations/loading-paperplane.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    position: "absolute",
    backgroundColor: "white",
    zIndex: 1,
    opacity: 0.8,
  },
});
