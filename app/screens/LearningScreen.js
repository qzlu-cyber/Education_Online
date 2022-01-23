/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 15:18:36
 * @LastEditTime: 2022-01-23 17:43:10
 * @Description: 继续学习页面
 */
import React from "react";
import {
  StatusBar,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
} from "react-native";

import ListItem from "../components/ListItem";
import colors from "../config/colors";

import { myCourses } from "../config/db";

function LearningScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myCourses}
        keyExtractor={(myCourse) => myCourse.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.itemContainer}
            imgStyle={styles.img}
            imgSource={item.imgSource}
            textContainerStyle={styles.textContainer}
            titleStyle={styles.courseName}
            title={item.courseName}
            subTitleStyle={styles.teacherName}
            subTitle={item.teacher}
            rate={item.rate}
            people={item.people}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
  },
  imgStyle: {
    width: 180,
    height: 120,
    borderRadius: 5,
  },
  card: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 24,
    color: colors.boldText,
  },
  subText: {
    color: colors.lightText,
    fontSize: 14,
    marginLeft: 10,
    marginVertical: 10,
  },
  //item
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
  },
  courseName: {
    color: colors.boldText,
    fontSize: 22,
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
});

export default LearningScreen;
