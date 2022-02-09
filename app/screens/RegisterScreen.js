/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 14:20:54
 * @LastEditTime: 2022-02-09 16:51:18
 * @Description: 注册页
 */
import React from "react";
import { StyleSheet, View } from "react-native";

import AppTextInput from "../components/AppTextInput";
import RegisterSvg from "../svgs/RegisterSvg";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import ImageInput from "../components/ImageInput";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <RegisterSvg style={styles.svg} />
      <View style={styles.info}>
        <ImageInput image={true} />
        <AppTextInput
          title='昵称'
          titleStyle={styles.nickname}
          inputStyle={styles.nicknameInput}
          placeholder='请输入昵称'
        />
      </View>
      <AppTextInput
        title='邮箱'
        inputStyle={styles.input}
        placeholder='请输入邮箱'
      />
      <AppTextInput
        title='密码'
        inputStyle={styles.input}
        placeholder='密码不少于八位'
      />
      <View style={styles.codeContainer}>
        <AppTextInput inputStyle={styles.validation} placeholder='验证码' />
        <AppButton
          style={styles.button}
          title='发送验证码'
          textStyle={styles.text}
        />
      </View>
      <AppButton
        style={styles.register}
        title='立即注册'
        textStyle={styles.text}
      />
      <AppButton
        style={styles.login}
        title='已有账号? 立即登陆'
        textStyle={styles.loginText}
        onPress={() => {
          navigation.navigate("登陆");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  svg: {
    width: 300,
    height: 180,
    marginTop: 30,
  },
  info: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  nicknameInput: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  nickname: {
    marginLeft: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  warningText: {
    color: "red",
    fontSize: 14,
  },
  codeContainer: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  validation: {
    width: 140,
    height: 50,
    borderWidth: 1,
    marginBottom: -10,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.praimary,
    width: 140,
    height: 50,
    marginLeft: 20,
  },
  text: {
    color: colors.white,
  },
  register: {
    width: 300,
    height: 50,
    marginTop: 30,
    backgroundColor: colors.praimary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  login: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginText: {
    color: colors.praimary,
    fontSize: 16,
  },
});
