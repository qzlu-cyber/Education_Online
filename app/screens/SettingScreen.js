/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 18:20:07
 * @LastEditTime: 2022-04-10 18:25:01
 * @Description: 设置页
 */
import { StyleSheet, View } from "react-native";

import useAuth from "../auth/useAuth";

import ProfileItem from "../components/ProfileItem";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

export default function SettingScreen() {
  const { logOut } = useAuth();

  return (
    <View style={styles.container}>
      <ProfileItem text='头像' avatar />
      <ProfileItem text='昵称' nickname='Kaesar' />
      <ProfileItem text='个性签名' sign />
      <ProfileItem text='邮箱' data='941648981@qq.com' />
      <AppButton
        style={styles.button}
        title='退出登录'
        textStyle={styles.buttonText}
        onPress={() => logOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: colors.praimary,
    fontSize: 16,
  },
});
