/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 17:48:58
 * @LastEditTime: 2022-04-21 18:29:05
 * @Description: 首页老师卡片
 */
import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

import colors from "../config/colors";
import AppText from "./AppText";

// 点击跳转到老师界面，显示老师的所有课程
function AppTeacherCard({
  navigation,
  teacherName,
  tel,
  email,
  info,
  teacher,
  myCourses,
}) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("老师详情", {
            teacherName,
            tel,
            email,
            info,
            teacher,
            myCourses,
          });
        }}>
        <View style={[styles.card]}>
          <Image
            source={require("../assets/teacherBackground.jpg")}
            style={[styles.teacherBackground]}
          />
          <Image
            source={require("../assets/teacherImg1.jpg")}
            style={styles.teacher}
            resizeMode='stretch'
          />
        </View>
      </TouchableOpacity>
      <AppText text={teacherName} style={styles.title} />
      <AppText text='React大神' style={styles.subtitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 175,
    height: 235,
    marginVertical: 10,
    marginRight: 20,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  teacherBackground: {
    width: 175,
    height: 150,
    borderRadius: 5,
  },
  teacher: {
    position: "absolute",
    zIndex: 2,
  },
  title: {
    fontSize: 22,
    color: colors.boldText,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightText,
  },
});

export default AppTeacherCard;
