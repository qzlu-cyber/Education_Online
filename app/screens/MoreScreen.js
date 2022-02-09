/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 18:37:22
 * @LastEditTime: 2022-02-09 18:38:27
 * @Description: icon更多
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text>MoreScreen</Text>
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
