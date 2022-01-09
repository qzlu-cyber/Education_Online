/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 10:34:39
 * @LastEditTime: 2022-01-09 12:18:05
 * @Description: 列表项
 */
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

/**
 * @description:
 * @param {
 *  containerStyle: 列表项组件容器,
 *  imgStyle: 图片,
 *  imgSource: 图片资源,
 *  textContainerStyle: 图片右侧整个容器,
 *  titleStyle: 标题样式,
 *  title: 标题,
 *  subTitleStyle: 副标题样式,
 *  subTitle: 副标题,
 *  //如果没有rate，下面不再渲染。复用为发帖组件
 *  rateStyle: 副标题下方容器,
 *  rate: 评分,
 *  people: 学习该课程的人数,
 *  styles.people: 人数样式,
 * }
 * @return {*}
 */
function ListItem({
  containerStyle,
  imgStyle,
  imgSource,
  textContainerStyle,
  titleStyle,
  title,
  subTitleStyle,
  subTitle,
  rate,
  people,
}) {
  return (
    <TouchableOpacity>
      <View style={containerStyle}>
        <Image style={imgStyle} source={imgSource} />
        <View style={textContainerStyle}>
          <AppText text={title} style={titleStyle} />
          <AppText text={subTitle} style={subTitleStyle} />
          <View style={styles.rate}>
            <Ionicons name='people' size={16} color='black' />
            <AppText text={people} style={styles.text} />
            <AppText text={rate} style={styles.people} />
            <Foundation
              name='star'
              size={16}
              color={colors.sign}
              style={styles.starIcon}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: colors.lightText,
    marginRight: 10,
    marginLeft: 5,
  },
  people: {
    fontSize: 14,
    color: colors.lightText,
    marginHorizontal: 2,
  },
});

export default ListItem;
