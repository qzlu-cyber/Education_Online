/*
 * @Author: 刘俊琪
 * @Date: 2022-01-27 17:47:39
 * @LastEditTime: 2022-02-09 15:34:39
 * @Description: 个人信息页
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import ProfileItem from "../components/ProfileItem";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileItem text='头像' avatar />
      <ProfileItem text='昵称' nickname='Kaesar' />
      <ProfileItem text='个性签名' sign />
      <ProfileItem text='邮箱' data='941648981@qq.com' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
