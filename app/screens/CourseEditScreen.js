/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 15:46:38
 * @LastEditTime: 2022-02-18 15:13:05
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
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";

export default function CourseEditScreen() {
  const [videoNum, setVideoNum] = useState([0]);
  const [count, setCount] = useState(1);
  const [icon, setIcon] = useState("md-arrow-down");

  const handlePress = () => {
    setCount(count + 1);
    videoNum.push(count);
    setVideoNum(videoNum);
  };

  const handleOpen = () => {
    if (Platform.OS === "ios") setIcon("md-arrow-up");
  };

  const handleClose = () => {
    setIcon("md-arrow-down");
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
        <View style={styles.category}>
          <AppText text='课程分类' />
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 12,
              },
            }}
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" },
            ]}
            useNativeAndroidPickerStyle={false}
            onOpen={handleOpen}
            onClose={handleClose}
            Icon={() => {
              return <Ionicons name={icon} size={24} color='gray' />;
            }}
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
        <Toast visibilityTime={5000} />
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
  category: {},
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: colors.boldText,
  },
  inputAndroid: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: colors.boldText,
  },
});
