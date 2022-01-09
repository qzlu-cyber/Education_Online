/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 14:03:00
 * @LastEditTime: 2022-01-09 15:15:57
 * @Description: 轮播图
 */
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import colors from "../config/colors";

function AppSwiper(props) {
  return (
    <Swiper style={styles.wrapper} autoplay={true} autoplayTimeout={3}>
      <View style={styles.slide}>
        <Image
          source={require("../assets/background/background3.jpg")}
          resizeMode='contain'
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../assets/background/background3.jpg")}
          resizeMode='contain'
        />
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../assets/background/background3.jpg")}
          resizeMode='contain'
        />
      </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightText,
  },
});

export default AppSwiper;
