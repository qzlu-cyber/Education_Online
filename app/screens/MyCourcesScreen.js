/*
 * @Author: 刘俊琪
 * @Date: 2021-11-29 22:18:14
 * @LastEditTime: 2022-01-27 15:34:33
 * @Description: 我的课程页
 */
import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

import AppText from "../components/AppText";
import CourseList from "../components/CourseList";
import { courseList } from "../config/db";

export default function MyCourcesScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/images/cat.png")}
      style={{ width: "100%", height: "100%" }}>
      <AppText text='我的课程' style={styles.title} />
      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        alwaysOpen={600}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}>
        <View style={{ marginTop: 40 }}>
          {courseList.map((item) => (
            <CourseList
              key={item.id.toString()}
              img={item.img}
              title={item.title}
              bg={item.bg}
              onPress={() => navigation.navigate("视频")}
            />
          ))}
        </View>
      </Modalize>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 35,
    width: 200,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 70,
  },
});
