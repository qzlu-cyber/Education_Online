/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 15:28:48
 * @LastEditTime: 2022-04-06 19:04:58
 * @Description: 卡片
 */
import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "./AppText";

function AppCard({ cardStyle, imageStyle, textStyle, navigation, item }) {
  return (
    <>
      {navigation && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("课程详情", {
              item: item,
            });
          }}>
          <View style={[styles.card, cardStyle]}>
            <Image
              source={{ uri: item.cover }}
              style={[imageStyle]}
              resizeMode='cover'
            />
            <AppText text={item.name} style={[textStyle]} />
          </View>
        </TouchableOpacity>
      )}
      {!navigation && (
        <TouchableWithoutFeedback>
          <View style={[styles.card, cardStyle]}>
            <Image
              source={{ uri: item.cover }}
              style={[imageStyle]}
              resizeMode='cover'
            />
            <AppText text={item.name} style={[textStyle]} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // shadowColor: colors.lightText,
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 0.7,
    // elevation: 20,
  },
});

export default AppCard;
