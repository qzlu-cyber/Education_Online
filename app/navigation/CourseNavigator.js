/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:30:12
 * @LastEditTime: 2022-04-09 12:49:09
 * @Description: 描述
 */
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AppText from "../components/AppText";
import Footer from "../components/Footer";
import AppComment from "../components/AppComment";
import { comments } from "../config/db";

const windowWidth = Dimensions.get("window").width;

const MaterialTopTab = createMaterialTopTabNavigator();

const CourseDetailTab = () => (
  <MaterialTopTab.Navigator>
    <MaterialTopTab.Screen name='课程介绍' component={CourseInfoScreen} />
    <MaterialTopTab.Screen name='课程目录' component={CourseCatelogScreen} />
    <MaterialTopTab.Screen name='课程评价' component={CourseJudgementScreen} />
  </MaterialTopTab.Navigator>
);

let courseDetail;

export default function CourseNavigator({ course }) {
  courseDetail = course;
  return <CourseDetailTab />;
}

import colors from "../config/colors";
import Chapters from "../components/Chapters";

function CourseCatelogScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {courseDetail.courseDetail.map((item, index) => (
        <Chapters
          key={index}
          color='#fde6e6'
          percent={25}
          duration='2 hours, 20 minutes'
          title={item.title}
          num={index + 1}
          navigation={navigation}
          bg={colors.test}
          videoUri={item.uri}
        />
      ))}
    </ScrollView>
  );
}

function CourseInfoScreen() {
  return (
    <View style={styles.courseInfoContainer}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/background/background1.jpg")}
            resizeMode='contain'
          />
          <Image
            source={require("../assets/background/background2.jpg")}
            resizeMode='contain'
          />
          <Image
            source={require("../assets/background/background3.jpg")}
            resizeMode='contain'
          />
        </View>
        <View style={styles.textInfoContainer}>
          <AppText text='Info' />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
}

function CourseJudgementScreen({ navigation }) {
  return (
    <FlatList
      data={comments}
      keyExtractor={(comment) => comment.id.toString()}
      renderItem={({ item }) => (
        <AppComment
          nickName={item.nickName}
          avatar={item.avatar}
          content={item.content}
          star={item.star}
          navigation={navigation}
        />
      )}
    />
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
  //
  courseInfoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: windowWidth,
  },
  textInfoContainer: {
    marginVertical: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
