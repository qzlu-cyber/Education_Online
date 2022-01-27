/*
 * @Author: 刘俊琪
 * @Date: 2022-01-27 17:47:39
 * @LastEditTime: 2022-01-27 18:06:51
 * @Description: 个人信息页
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import ProfileItem from "../components/ProfileItem";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileItem text='头像' avatar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
