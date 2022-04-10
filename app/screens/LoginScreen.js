/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 16:07:37
 * @LastEditTime: 2022-04-10 18:32:38
 * @Description: 登陆页
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import LoginSvg from "../svgs/LoginSvg";
import colors from "../config/colors";

import authAPi from "../api/auth";
import useAuth from "../auth/useAuth";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      const result = await authAPi.login(email, password);

      if (result.ok) {
        login(result.data);
      }
    }
  };

  return (
    <View style={styles.container}>
      <LoginSvg style={styles.svg} />
      <AppTextInput
        title='邮箱'
        inputStyle={styles.input}
        value={email}
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        title='密码'
        inputStyle={styles.input}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <AppButton
        style={styles.login}
        title='立即登陆'
        textStyle={styles.text}
        onPress={handleSubmit}
      />
      <AppButton
        style={styles.register}
        title='没有账号? 立即注册'
        textStyle={styles.registerText}
        onPress={() => {
          navigation.navigate("注册");
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
    height: 280,
    marginTop: 30,
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
  text: {
    color: colors.white,
  },
  login: {
    width: 300,
    height: 50,
    marginTop: 30,
    backgroundColor: colors.praimary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  register: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  registerText: {
    color: colors.praimary,
    fontSize: 16,
  },
});
