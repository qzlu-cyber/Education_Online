/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 16:33:20
 * @LastEditTime: 2022-04-09 15:50:24
 * @Description: 带有标签的卡片
 */
import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Foundation } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "./AppText";

function AppCardWithSign({
  cardStyle,
  imageStyle,
  imgSource,
  text,
  signText,
  signTextStyle,
  navigation,
  item,
}) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("课程详情", { item: item });
        }}>
        <View style={[styles.card, cardStyle]}>
          <Image source={imgSource} style={[imageStyle]} resizeMode='cover' />
        </View>
      </TouchableOpacity>
      <View style={styles.sign}>
        <AppText text={signText} style={[signTextStyle]} />
      </View>
      <View style={styles.nameAndRateContainer}>
        <AppText text={item.name} style={styles.title} />
        <AppText text={item.teacherName} style={styles.subtitle} />
      </View>
      <View style={styles.rateContainer}>
        <AppText text={item.stars + ".0"} style={styles.rate} />
        <View style={styles.star}>
          <Foundation
            name='star'
            size={16}
            color={colors.sign}
            style={styles.starIcon}
          />
          <Foundation
            name='star'
            size={16}
            color={colors.sign}
            style={styles.starIcon}
          />
          <Foundation
            name='star'
            size={16}
            color={colors.sign}
            style={styles.starIcon}
          />
          <Foundation
            name='star'
            size={16}
            color={colors.sign}
            style={styles.starIcon}
          />
          <Foundation
            name='star'
            size={16}
            color={colors.sign}
            style={styles.starIcon}
          />
          <AppText text={item.saleNum} style={styles.subtitle} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  sign: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  nameAndRateContainer: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 22,
    color: colors.boldText,
    width: 160,
    height: 26,
    overflow: "hidden",
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightText,
  },
  rateContainer: {
    width: 160,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rate: {
    fontSize: 14,
    color: colors.lightText,
  },
  star: {
    flexDirection: "row",
  },
  starIcon: {
    marginHorizontal: 1,
  },
});

export default AppCardWithSign;
