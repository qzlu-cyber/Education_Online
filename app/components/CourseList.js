/*
 * @Author: 刘俊琪
 * @Date: 2021-11-29 22:18:14
 * @LastEditTime: 2022-01-27 15:42:00
 * @Description: 描述
 */
import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import AppText from "./AppText";

export default function CourseList({ img, title, bg, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: bg }]}>
      <Image source={img} style={{ width: 40, height: 40 }} />
      <View>
        <AppText text={title} style={styles.title} />
        <AppText text='10 hours, 19 lessons' style={styles.time} />
      </View>
      <AppText text='25%' style={styles.progress} />
      <ProgressCircle
        percent={25}
        radius={17}
        borderWidth={1.5}
        color='#f58084'
        shadowColor='#FFF'
        bgColor='#FFF'>
        <Image source={require("../assets/images/pl.png")} />
      </ProgressCircle>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    color: "#345c74",
    fontSize: 13,
    paddingHorizontal: 20,
    width: 170,
  },
  time: {
    color: "#f58084",
    fontSize: 12,
    paddingHorizontal: 20,
  },
  progress: {
    color: "#345c74",
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
