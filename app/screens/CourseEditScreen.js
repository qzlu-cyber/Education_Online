/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 15:46:38
 * @LastEditTime: 2022-02-09 18:35:39
 * @Description: 发布课程
 */
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Alert,
} from "react-native";

import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import AppButton from "../components/AppButton";

export default function CourseEditScreen() {
  const [videoNum, setVideoNum] = useState([0]);
  const [count, setCount] = useState(1);

  const handlePress = () => {
    setCount(count + 1);
    videoNum.push(count);
    setVideoNum(videoNum);
  };

  const handleSubmit = () => {
    Alert.alert("删除", "你确定删除吗？", [
      { text: "确定" }, //TODO: 触发提交事件
      { text: "返回" }, //TODO: 触发取消事件
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%" }}>
          <AppTextInput
            title='课程名称'
            inputStyle={styles.input}
            placeholder='请输入名称'
          />
        </View>
        {videoNum.map((index) => (
          <View style={styles.uploadContainer} key={index}>
            <AppTextInput
              inputStyle={styles.input}
              placeholder='请输入小节名称'
            />
            <ImageInput video={true} />
          </View>
        ))}
        <AppButton
          style={styles.button}
          title='继续添加'
          textStyle={styles.buttonText}
          onPress={handlePress}
        />
        <AppButton
          style={styles.button}
          title='提交'
          textStyle={styles.buttonText}
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  uploadContainer: {
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    color: colors.lightText,
    letterSpacing: 2,
  },
  editContainer: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: colors.white,
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 30,
    backgroundColor: colors.praimary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
