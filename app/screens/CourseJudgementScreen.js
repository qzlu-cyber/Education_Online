/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:09:20
 * @LastEditTime: 2022-02-18 16:04:48
 * @Description: 课程评价页
 */
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import AppComment from "../components/AppComment";

import { comments } from "../config/db";

export default function CourseJudgementScreen({ navigation }) {
  return (
    <FlatList
      data={comments}
      keyExtractor={(comment) => comment.id.toString()}
      renderItem={({ item }) => (
        <AppComment
          nickName={item.nickName}
          avatar={item.avatar}
          content={item.content}
          star={item.star}
          navigation={navigation}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
