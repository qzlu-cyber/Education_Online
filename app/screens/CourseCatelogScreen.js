/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:03:25
 * @LastEditTime: 2022-01-23 17:11:15
 * @Description: 课程目录页
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CourseCatelogScreen() {
  return (
    <View style={styles.container}>
      <Text>Catelog</Text>
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
