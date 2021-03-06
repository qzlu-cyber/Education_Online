/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 18:20:07
 * @LastEditTime: 2022-04-11 08:19:39
 * @Description: 设置页
 */
import { StyleSheet, View } from "react-native";

import useAuth from "../auth/useAuth";

import ProfileItem from "../components/ProfileItem";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

export default function SettingScreen({ route }) {
  const { logOut } = useAuth();

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
