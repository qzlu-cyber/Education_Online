/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 15:28:48
 * @LastEditTime: 2022-04-12 15:04:59
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

function AppCard({
  cardStyle,
  imageStyle,
  textStyle,
  navigation,
  item,
  myCourses,
}) {
  return (
    <>
      {navigation && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("课程详情", {
              item: item,
              mycourse: myCourses.includes(item._id),
            });
          }}>
          <View style={[styles.card, cardStyle]}>
            <Image
              source={{
                uri:
                  item.cover.length > 100
                    ? `data:image/jpeg;base64,${item.cover}`
                    : item.cover,
              }}
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
