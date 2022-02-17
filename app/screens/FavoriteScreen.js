/*
 * @Author: 刘俊琪
 * @Date: 2022-01-20 12:21:25
 * @LastEditTime: 2022-02-17 22:26:20
 * @Description: 我的收藏
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";

function FavoriteScreen() {
  return (
    <View style={styles.container}>
      <AppText text='我的收藏' />
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

export default FavoriteScreen;
