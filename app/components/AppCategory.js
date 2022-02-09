/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 15:32:28
 * @LastEditTime: 2022-02-09 18:44:19
 * @Description: 首页各种种类组件
 */
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import React from "react";
import AppCard from "./AppCard";
import AppCardWithSign from "./AppCardWithSign";
import AppTeacherCard from "./AppTeacherCard";
import AppText from "./AppText";
import colors from "../config/colors";

function AppCategory({
  viewStyle,
  categoryNameStyle,
  categoryName,
  categoryNameTextStyle,
  cardContainerStyle,
  navigation,
}) {
  return (
    <View style={[styles.popular, viewStyle]}>
      <View style={[styles.categoryName, categoryNameStyle]}>
        <AppText
          text={categoryName}
          style={[styles.categoryText, categoryNameTextStyle]}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("更多", {
              categoryName,
            })
          }>
          <EvilIcons name='arrow-right' size={28} color='black' />
        </TouchableOpacity>
      </View>
      {categoryName === "最受欢迎" && (
        <ScrollView
          style={[styles.cardContainer, cardContainerStyle]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <AppCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background1.jpg")}
            text='React'
            textStyle={styles.title}
            navigation={navigation}
          />
          <AppCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background2.jpg")}
            text='React Native'
            textStyle={styles.title}
            navigation={navigation}
          />
          <AppCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background3.jpg")}
            text='JavaScript'
            textStyle={styles.title}
            navigation={navigation}
          />
          <AppCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background4.jpg")}
            text='UI/UX设计'
            textStyle={styles.title}
            navigation={navigation}
          />
        </ScrollView>
      )}
      {categoryName === "本月最多学习" && (
        <ScrollView
          style={[styles.cardContainer, cardContainerStyle]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <AppCardWithSign
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background5.jpg")}
            text='React'
            textStyle={styles.title}
            signText='热门'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppCardWithSign
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background6.jpg")}
            text='React Native'
            textStyle={styles.title}
            signText='上新'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppCardWithSign
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background7.jpg")}
            text='JavaScript'
            textStyle={styles.title}
            signText='热门'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppCardWithSign
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background8.jpg")}
            text='UI/UX设计'
            textStyle={styles.title}
            signText='好评'
            signTextStyle={styles.text}
            navigation={navigation}
          />
        </ScrollView>
      )}
      {categoryName === "本月最受欢迎老师" && (
        <ScrollView
          style={[styles.cardContainer, cardContainerStyle]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <AppTeacherCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background5.jpg")}
            text='React'
            textStyle={styles.title}
            signText='热门'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppTeacherCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background6.jpg")}
            text='React Native'
            textStyle={styles.title}
            signText='上新'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppTeacherCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background7.jpg")}
            text='JavaScript'
            textStyle={styles.title}
            signText='热门'
            signTextStyle={styles.text}
            navigation={navigation}
          />
          <AppTeacherCard
            cardStyle={styles.card}
            imageStyle={styles.img}
            imgSource={require("../assets/background/background8.jpg")}
            text='UI/UX设计'
            textStyle={styles.title}
            signText='好评'
            signTextStyle={styles.text}
            navigation={navigation}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  popular: {
    paddingHorizontal: 20,
  },
  categoryName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontStyle: "normal",
    fontSize: 22,
    fontWeight: "500",
    color: colors.boldText,
    letterSpacing: 2,
  },
  cardContainer: {
    flexDirection: "row",
  },
  card: {
    marginVertical: 10,
    marginRight: 20,
    alignItems: "center",
  },
  img: {
    width: 160,
    height: 140,
    borderRadius: 5,
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    bottom: 10,
    color: colors.white,
    fontSize: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: colors.sign,
    top: 20,
    left: 15,
  },
  rateTextStyle: {},
});

export default AppCategory;
