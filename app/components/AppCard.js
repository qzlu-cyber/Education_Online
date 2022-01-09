/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 15:28:48
 * @LastEditTime: 2022-01-09 15:48:58
 * @Description: 卡片
 */
import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import colors from "../config/colors";

import AppText from "./AppText";

function AppCard({ cardStyle, imageStyle, imgSource, text, textStyle }) {
  return (
    <TouchableOpacity>
      <View style={[styles.card, cardStyle]}>
        <Image source={imgSource} style={[imageStyle]} resizeMode='cover' />
        <AppText text={text} style={[textStyle]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: colors.lightText,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    elevation: 20,
  },
});

export default AppCard;
