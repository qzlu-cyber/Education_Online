/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:49:57
 * @LastEditTime: 2022-01-27 18:00:40
 * @Description: 首页
 */
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppCategory from "../components/AppCategory";
import ListItem from "../components/ListItem";
import { courses } from "../config/db";
import Footer from "../components/Footer";

/**
 * @description:
 * @param {*} navigation 导航页面 用于课程卡片跳转到课程详情页
 * @return {*}
 */
const windowWidth = Dimensions.get("window").width;

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(course) => course.id.toString()}
        ListHeaderComponent={
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={styles.text}>
                <AppText style={styles.welcome} text='早上好，刘俊琪' />
                <AppText style={styles.goal} text='今天打算学点什么？' />
              </View>
              <TouchableOpacity>
                <Image
                  source={require("../assets/avatar.jpg")}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
              <TextInput style={styles.search} placeholder='搜索' />
              <EvilIcons
                name='search'
                size={28}
                color='black'
                style={styles.searchIcon}
              />
            </View>
            <AppCategory
              viewStyle={styles.category}
              categoryNameStyle={styles.categoryName}
              categoryName='最受欢迎'
              categoryNameTextStyle={styles.categoryText}
              cardContainerStyle={styles.cardContainer}
              navigation={navigation}
            />
            <AppCategory
              viewStyle={styles.category}
              categoryNameStyle={styles.categoryName}
              categoryName='本月最多学习'
              categoryNameTextStyle={styles.categoryText}
              cardContainerStyle={styles.cardContainer}
              navigation={navigation}
            />
            <AppCategory
              viewStyle={styles.category}
              categoryNameStyle={styles.categoryName}
              categoryName='本月最受欢迎老师'
              categoryNameTextStyle={styles.categoryText}
              cardContainerStyle={styles.cardContainer}
              navigation={navigation}
            />
            <View style={styles.more}>
              <AppText text='为您推荐' style={styles.listText} />
              <TouchableOpacity>
                <EvilIcons name='arrow-right' size={28} color='black' />
              </TouchableOpacity>
            </View>
          </ScrollView>
        }
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
        ListFooterComponent={
          <View style={styles.other}>
            <View style={styles.more}>
              <AppText text='其他精品课程' style={styles.listText} />
              <TouchableOpacity>
                <EvilIcons name='arrow-right' size={28} color='black' />
              </TouchableOpacity>
            </View>
            <FlatList
              data={courses}
              keyExtractor={(course) => course.id.toString()}
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
              ListFooterComponent={<Footer />}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight + 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 20,
    justifyContent: "center",
  },
  welcome: {
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: "500",
    color: colors.boldText,
  },
  goal: {
    fontStyle: "normal",
    fontSize: 13,
    fontWeight: "normal",
    color: colors.lightText,
    letterSpacing: 0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 20,
  },
  searchContainer: {
    justifyContent: "center",
  },
  search: {
    height: 60,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.lightText,
    borderRadius: 5,
  },
  searchIcon: {
    position: "absolute",
    right: 30,
  },
  category: {
    marginBottom: 20,
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
    letterSpacing: 1,
  },
  cardContainer: {
    flexDirection: "row",
  },
  listText: {
    color: colors.boldText,
    fontSize: 22,
    marginHorizontal: 20,
    letterSpacing: 1,
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

export default HomeScreen;
