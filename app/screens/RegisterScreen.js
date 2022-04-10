/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 14:20:54
 * @LastEditTime: 2022-04-10 18:31:27
 * @Description: 注册页
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import AppTextInput from "../components/AppTextInput";
import RegisterSvg from "../svgs/RegisterSvg";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import ImageInput from "../components/ImageInput";

import usersApi from "../api/users";

export default function RegisterScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [press, setPress] = useState(false); //是否已点击过获取验证码
  const [count, setCount] = useState(60);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "注册成功",
      text2: "欢迎新用户👋",
    });
  };

  const showWarnToast = (msg) => {
    Toast.show({
      type: "error",
      text1: "发生了一些错误",
      text2: msg,
    });
  };

  const getAvatarUri = (value) => {
    setAvatar(value);
  };

  const handleGetCode = async () => {
    if (!press) {
      const reg =
        /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;

      //验证邮箱格式是否正确
      if (reg.test(email)) {
        const result = await usersApi.getCode(email);
        //验证码发送成功开始倒计时
        if (result.ok) {
          let countdown = 60;
          setPress(true);
          let timer = setInterval(() => {
            setCount(countdown--);
            if (countdown <= -1) {
              clearInterval(timer);
              setPress(false);
              setCount(60);
            }
          }, 1000);
        }
      }
    }
  };

  const handleSubmit = async () => {
    const user = {
      name: userName,
      email: email,
      avatar: avatar,
      password: password,
      code: code,
    };
    const result = await usersApi.register(user);

    if (!result.ok) showWarnToast(result.data);

    if (result.ok) {
      setUserName("");
      setAvatar("");
      setCode("");
      setEmail("");
      setPassword("");
      showToast();
    }
  };

  return (
    <View style={styles.container}>
      <RegisterSvg style={styles.svg} />
      <View style={styles.info}>
        <ImageInput image={true} getCoverUri={getAvatarUri} />
        <AppTextInput
          title='昵称'
          value={userName}
          titleStyle={styles.nickname}
          inputStyle={styles.nicknameInput}
          placeholder='请输入昵称'
          onChangeText={(text) => setUserName(text)}
        />
      </View>
      <AppTextInput
        title='邮箱'
        value={email}
        inputStyle={styles.input}
        placeholder='请输入邮箱'
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <AppTextInput
        title='密码'
        value={password}
        inputStyle={styles.input}
        placeholder='密码不少于八位'
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.codeContainer}>
        <AppTextInput
          inputStyle={styles.validation}
          placeholder='验证码'
          value={code}
          keyboardType='numeric'
          onChangeText={(text) => setCode(text)}
        />
        <AppButton
          style={!press ? styles.button : styles.disabledButton}
          title={!press ? "发送验证码" : count + "秒后重新获取"}
          textStyle={!press ? styles.text : styles.disabledText}
          onPress={handleGetCode}
        />
      </View>
      <AppButton
        style={styles.register}
        title='立即注册'
        textStyle={styles.text}
        onPress={handleSubmit}
      />
      <AppButton
        style={styles.login}
        title='已有账号? 立即登陆'
        textStyle={styles.loginText}
        onPress={() => {
          navigation.navigate("登陆");
        }}
      />
      <Toast visibilityTime={3000} />
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
  disabledButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.gray,
    width: 140,
    height: 50,
    marginLeft: 20,
  },
  disabledText: {
    color: colors.praimary,
    fontSize: 14,
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
