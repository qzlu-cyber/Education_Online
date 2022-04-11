/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 15:32:28
 * @LastEditTime: 2022-04-11 07:27:48
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
  teacherName,
  tel,
  email,
  info,
  navigation,
  data,
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
              data,
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
          {data &&
            data.map((item) => (
              <AppCard
                key={item._id}
                item={item}
                cardStyle={styles.card}
                imageStyle={styles.img}
                imgSource={{ uri: item.cover }}
                text={item.name}
                textStyle={styles.title}
                navigation={navigation}
              />
            ))}
        </ScrollView>
      )}
      {categoryName === "本月最多学习" && (
        <ScrollView
          style={[styles.cardContainer, cardContainerStyle]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {data &&
            data.map((item) => {
              return (
                <AppCardWithSign
                  key={item._id}
                  item={item}
                  cardStyle={styles.card}
                  imageStyle={styles.img}
                  imgSource={{
                    uri:
                      item.cover.length > 100
                        ? `data:image/jpeg;base64,${item.cover}`
                        : item.cover,
                  }}
                  text={item.name}
                  textStyle={styles.title}
                  signText='上新'
                  signTextStyle={styles.text}
                  navigation={navigation}
                />
              );
            })}
        </ScrollView>
      )}
      {categoryName === "本月最受欢迎老师" && (
        <ScrollView
          style={[styles.cardContainer, cardContainerStyle]}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <AppTeacherCard
            teacherName={teacherName}
            tel={tel}
            email={email}
            info={info}
            navigation={navigation}
          />
          <AppTeacherCard
            teacherName={teacherName}
            tel={tel}
            email={email}
            info={info}
            navigation={navigation}
          />
          <AppTeacherCard
            teacherName={teacherName}
            tel={tel}
            email={email}
            info={info}
            navigation={navigation}
          />
          <AppTeacherCard
            teacherName={teacherName}
            tel={tel}
            email={email}
            info={info}
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
