/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:03:25
 * @LastEditTime: 2022-01-24 19:18:43
 * @Description: 课程目录页
 */
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Foundation } from "@expo/vector-icons";

import AppText from "../components/AppText";
import colors from "../config/colors";

export default function CourseCatelogScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.chapterContainer}>
        <AppText
          text='第一章 课程介绍（了解课程必看）'
          style={styles.chapterText}
        />
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='1-1 导学（12:20）' style={styles.itemText} />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='1-1 预览（10:37）' style={styles.itemText} />
        </View>
      </View>
      <View style={styles.chapterContainer}>
        <AppText
          text='第二章 了解TypeScript工作流'
          style={styles.chapterText}
        />
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText
            text='2-1 什么是TypeScript（14:22）'
            style={styles.itemText}
          />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='2-2 开发环境配置（05:07）' style={styles.itemText} />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText
            text='2-3 TypeScript工作流（10:47）'
            style={styles.itemText}
          />
        </View>
      </View>
      <View style={styles.chapterContainer}>
        <AppText text='第三章 TypeScript基础' style={styles.chapterText} />
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='3-1 变量声明（05:20）' style={styles.itemText} />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText
            text='3-2 TypeScript类型简介（02:07）'
            style={styles.itemText}
          />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='3-3 TypeScript函数（03:57）' style={styles.itemText} />
        </View>
      </View>
      <View style={styles.chapterContainer}>
        <AppText
          text='第三章 课程介绍（了解课程必看）'
          style={styles.chapterText}
        />
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='1-1 导学（12:20）' style={styles.itemText} />
        </View>
        <View style={styles.itemContainer}>
          <Foundation name='play-video' size={24} color={colors.lightText} />
          <AppText text='1-1 预览（10:37）' style={styles.itemText} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingVertical: 10,
  },
  chapterContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  chapterText: {
    fontSize: 18,
    color: colors.lightText,
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e2e4",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.lightText,
  },
});
