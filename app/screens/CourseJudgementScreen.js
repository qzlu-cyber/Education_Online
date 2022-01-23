/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:09:20
 * @LastEditTime: 2022-01-23 17:11:02
 * @Description: 课程评价页
 */
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CourseJudgementScreen() {
  return (
    <View style={styles.container}>
      <Text>Judgement</Text>
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
