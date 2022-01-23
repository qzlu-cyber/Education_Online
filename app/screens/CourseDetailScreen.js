/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 15:13:45
 * @LastEditTime: 2022-01-23 19:11:00
 * @Description: 课程详情页
 */
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import CourseNavigator from "./CourseNavigator";

const windowWidth = Dimensions.get("window").width;

export default function CourseDetailScreen({ route }) {
  return (
    <View style={styles.container}>
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
      {/* <CourseNavigator /> //TODO: 路由跳转有问题 */}
    </View>
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
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#E0E0E0",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    elevation: 20,
    overflow: "hidden",
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
