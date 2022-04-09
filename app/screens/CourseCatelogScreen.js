/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:03:25
 * @LastEditTime: 2022-04-09 11:50:04
 * @Description: 课程目录页
 */
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import colors from "../config/colors";
import Chapters from "../components/Chapters";

export default function CourseCatelogScreen({ navigation, route }) {
  console.log(route.params);
  return (
    <ScrollView style={styles.container}>
      <Chapters
        color='#fde6e6'
        percent={25}
        duration='2 hours, 20 minutes'
        title='Introduction'
        num={1}
        navigation={navigation}
        bg={colors.test}
      />
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
