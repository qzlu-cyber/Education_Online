/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:01:02
 * @LastEditTime: 2022-01-23 17:01:03
 * @Description: 课程简介
 */
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CourseInfoScreen() {
  return (
    <View style={styles.container}>
      <Text>Info</Text>
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
