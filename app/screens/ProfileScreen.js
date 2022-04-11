/*
 * @Author: 刘俊琪
 * @Date: 2022-01-27 17:47:39
 * @LastEditTime: 2022-04-11 08:16:29
 * @Description: 个人信息页
 */
import React from "react";
import { StyleSheet, View } from "react-native";

import ProfileItem from "../components/ProfileItem";

export default function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <ProfileItem text='头像' avatar initiaAvatar={route.params.avatar} />
      <ProfileItem text='昵称' nickname={route.params.user.name} />
      <ProfileItem
        text='个性签名'
        sign
        signature={route.params.user.signature}
      />
      <ProfileItem text='邮箱' data={route.params.user.email} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
