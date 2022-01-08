/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:49:57
 * @LastEditTime: 2022-01-08 18:23:17
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
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppCategory from "../components/AppCategory";

function HomeScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
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
        />
        <AppCategory
          viewStyle={styles.category}
          categoryNameStyle={styles.categoryName}
          categoryName='本月最多学习'
          categoryNameTextStyle={styles.categoryText}
          cardContainerStyle={styles.cardContainer}
        />
        <AppCategory
          viewStyle={styles.category}
          categoryNameStyle={styles.categoryName}
          categoryName='本月最受欢迎老师'
          categoryNameTextStyle={styles.categoryText}
          cardContainerStyle={styles.cardContainer}
        />
      </ScrollView>
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
    marginHorizontal: 20,
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
    letterSpacing: 2,
  },
  cardContainer: {
    flexDirection: "row",
  },
});

export default HomeScreen;
