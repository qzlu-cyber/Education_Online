/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:01:02
 * @LastEditTime: 2022-01-27 17:04:51
 * @Description: 课程简介
 */
import React from "react";
import { ScrollView, StyleSheet, View, Image, Dimensions } from "react-native";
import ActionButton from "react-native-action-button";

import AppText from "../components/AppText";
import Footer from "../components/Footer";

const windowWidth = Dimensions.get("window").width;

export default function CourseInfoScreen() {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
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
