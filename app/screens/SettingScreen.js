/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 18:20:07
 * @LastEditTime: 2022-02-12 18:23:03
 * @Description: 设置页
 */
import { StyleSheet, View } from "react-native";

import ProfileItem from "../components/ProfileItem";

export default function SettingScreen() {
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
