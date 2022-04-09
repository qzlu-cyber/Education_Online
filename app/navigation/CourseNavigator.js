/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:30:12
 * @LastEditTime: 2022-04-09 16:57:21
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
import { RichEditor } from "react-native-pell-rich-editor";

import Footer from "../components/Footer";
import AppComment from "../components/AppComment";
import { comments } from "../config/db";
import colors from "../config/colors";
import Chapters from "../components/Chapters";

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

//autoGetHeight
const BaseScript = `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setTimeout(changeHeight, 300);
    } ())
    `;

function CourseInfoScreen() {
  return (
    <View>
      <ScrollView>
        <RichEditor
          initialContentHTML={courseDetail.description}
          disabled={true}
          useContainer={true}
          initialHeight={1000}
          enterKeyHint={"done"}
        />
      </ScrollView>
      <Footer />
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
});
