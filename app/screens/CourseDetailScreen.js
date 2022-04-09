/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 15:13:45
 * @LastEditTime: 2022-04-09 11:52:45
 * @Description: 课程详情页
 */
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import CourseNavigator from "../navigation/CourseNavigator";

import AppButton from "../components/AppButton";

const windowWidth = Dimensions.get("window").width;

export default function CourseDetailScreen({ route, navigation }) {
  return (
    <>
      <ListItem
        containerStyle={styles.itemContainer}
        imgStyle={styles.img}
        imgUrl={route.params.item.cover}
        title={route.params.item.name}
        textContainerStyle={styles.textContainer}
        titleStyle={styles.courseName}
        subTitleStyle={styles.teacherName}
        subTitle={route.params.teacherName}
        rate={route.params.item.stars}
        people={route.params.item.saleNum}
        price={route.params.item.price}
        withoutPress
      />
      <CourseNavigator navigation={navigation} course={route.params.item} />
      <View style={styles.purchase}>
        <AppButton
          style={styles.button}
          title='咨询老师'
          textStyle={styles.text}
        />
        <AppButton
          style={styles.button}
          title='加入收藏'
          textStyle={styles.text}
        />
        <AppButton
          style={styles.button}
          title='立即购买'
          textStyle={styles.text}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#E0E0E0",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    elevation: 20,
    overflow: "hidden",
    backgroundColor: colors.white,
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
  purchase: {
    width: windowWidth,
    height: 50,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: windowWidth / 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  text: {
    fontSize: 18,
    color: "white",
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: 20,
    paddingRight: 20,
    letterSpacing: 2.0,
    backgroundColor: colors.praimary,
    borderRadius: 5,
    overflow: "hidden",
  },
});
