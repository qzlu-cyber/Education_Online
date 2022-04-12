/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 15:13:45
 * @LastEditTime: 2022-04-12 16:02:24
 * @Description: 课程详情页
 */
import React from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Toast from "react-native-toast-message";
import ActionButton from "react-native-action-button";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import CourseNavigator from "../navigation/CourseNavigator";

import AppButton from "../components/AppButton";

import useAuth from "../auth/useAuth";
import userApi from "../api/users";

const windowWidth = Dimensions.get("window").width;

export default function CourseDetailScreen({ route, navigation }) {
  const { user } = useAuth();

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "购买成功",
    });
  };

  const handleShopping = async () => {
    // console.log(route.params.item._id);
    if (!user) {
      console.log("请先登录");
      navigation.navigate("登录");
    } else {
      const result = await userApi.shopping(route.params.item._id);

      if (result.ok) showSuccessToast();
    }
  };

  return (
    <>
      <ListItem
        containerStyle={styles.itemContainer}
        item={route.params.item}
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
      <CourseNavigator
        navigation={navigation}
        course={route.params.item}
        isMyCourse={route.params.mycourse ? true : false}
      />
      {route.params.mycourse && (
        <ActionButton
          buttonColor={colors.praimary}
          onPress={() =>
            navigation.navigate("评价课程", {
              courseName: route.params.item.name,
              courseId: route.params.item._id,
            })
          }
          renderIcon={() => (
            <FontAwesome5 name='comment-alt' size={24} color={colors.white} />
          )}
        />
      )}
      {!route.params.mycourse && (
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
            onPress={handleShopping}
          />
        </View>
      )}

      <Toast visibilityTime={3000} />
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
