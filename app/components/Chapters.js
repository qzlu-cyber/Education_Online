/*
 * @Author: 刘俊琪
 * @Date: 2021-11-29 22:18:14
 * @LastEditTime: 2022-01-27 17:43:17
 * @Description: 分节视频
 */
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import colors from "../config/colors";
import AppText from "./AppText";

export default function Chapters({
  percent,
  duration,
  title,
  num,
  navigation,
  bg,
}) {
  return (
    <>
      {navigation && (
        <TouchableOpacity
          style={[styles.container, bg ? { backgroundColor: bg } : null]}
          onPress={() => navigation.navigate("视频")}>
          <>
            <View style={styles.number}>
              <AppText text={num} style={{ color: "#f58084" }} />
            </View>
            <View>
              <AppText text={title} style={styles.title} />
              <AppText text={duration} style={styles.subtitle} />
            </View>
            <AppText text={`${percent}%`} style={styles.progress} />
            <ProgressCircle
              percent={percent}
              radius={17}
              borderWidth={1.5}
              color='#f58084'
              shadowColor='#FFF'
              bgColor='#fff2f2'>
              <Image source={require("../assets/images/pl.png")} />
            </ProgressCircle>
          </>
        </TouchableOpacity>
      )}
      {!navigation && (
        <View style={styles.container}>
          <View style={styles.number}>
            <AppText text={num} style={{ color: "#f58084" }} />
          </View>
          <View>
            <AppText text={title} style={styles.title} />
            <AppText text={duration} style={styles.subtitle} />
          </View>
          <AppText text={`${percent}%`} style={styles.progress} />
          <ProgressCircle
            percent={percent}
            radius={17}
            borderWidth={1.5}
            color='#f58084'
            shadowColor='#FFF'
            bgColor='#fff2f2'>
            <Image source={require("../assets/images/pl.png")} />
          </ProgressCircle>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    backgroundColor: colors.white,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#345c74",
    fontSize: 16,
    paddingLeft: 20,
    width: 180,
  },
  subtitle: {
    color: "#f58084",
    fontSize: 12,
    paddingLeft: 20,
  },
  progress: {
    color: "#345c74",
    fontSize: 13,
    width: 50,
  },
});
