/*
 * @Author: 刘俊琪
 * @Date: 2021-11-29 22:18:14
 * @LastEditTime: 2022-04-09 14:29:04
 * @Description: 播放页
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Video } from "expo-av";

import Chapters from "../components/Chapters";
import AppText from "../components/AppText";

export default function VideoScreen({ route }) {
  return (
    <View style={style.container}>
      <Video
        source={{
          uri: route.params.videoUri,
        }}
        rate={1.0}
        isMuted={false}
        resizeMode='cover'
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={style.video}
      />
      <View style={{ flex: 2 }}>
        <Chapters
          color='#fde6e6'
          percent={25}
          duration='2 hours, 20 minutes'
          title={route.params.title}
          num={route.params.num}
        />
        <AppText
          style={style.info}
          text='User experiance (UX) design is the process design teams use to create
        products that provide meaningful and relevant experiances to users. This
        involves the design of the entire process of acquiring and integrating
        the product, including aspects of branding, design, usability and
        function. "User Experience Design" is often used interchangeably with
        terms such as "User Interfase Design" and "usability". However, while
        usability and user interfase (UI) design are important aspects of UX
        design, they are subsets of it - UX design covers a vast array of other
        areas, too. A UX designer is concerned with the entire process of
        acquiring and integrating a product,...'
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  video: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  info: {
    textAlign: "justify",
    color: "#345c74",
    paddingLeft: 42,
    paddingRight: 35,
    fontSize: 16,
  },
});
