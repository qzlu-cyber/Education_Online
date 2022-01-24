/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 15:13:45
 * @LastEditTime: 2022-01-24 17:46:13
 * @Description: 课程详情页
 */
import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import CourseNavigatorScreen from "./CourseNavigatorScreen";

const windowWidth = Dimensions.get("window").width;

export default function CourseDetailScreen({ route }) {
  return (
    <>
      <ListItem
        containerStyle={styles.itemContainer}
        imgStyle={styles.img}
        imgSource={route.params.imgSource}
        title={route.params.courseName}
        textContainerStyle={styles.textContainer}
        titleStyle={styles.courseName}
        subTitleStyle={styles.teacherName}
        subTitle='hhh'
        rate='5'
        people='3000'
        withoutPress
      />
      <CourseNavigatorScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#E0E0E0",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    elevation: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  img: {
    width: 80,
    height: 90,
    borderRadius: 5,
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    width: windowWidth - 130,
  },
  courseName: {
    color: colors.boldText,
    fontSize: 22,
    overflow: "hidden",
  },
  teacherName: {
    color: colors.lightText,
    fontSize: 14,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  people: {
    fontSize: 14,
    color: colors.lightText,
    marginHorizontal: 2,
  },
  other: {
    marginTop: 20,
  },
  more: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    alignItems: "center",
  },
});
