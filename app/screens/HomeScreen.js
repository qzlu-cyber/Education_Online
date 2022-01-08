/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:49:57
 * @LastEditTime: 2022-01-08 11:35:10
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
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";

function HomeScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderRadius: 10,
  },
  searchIcon: {
    position: "absolute",
    right: 30,
  },
});

export default HomeScreen;
