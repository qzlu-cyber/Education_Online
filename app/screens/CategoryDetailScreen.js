/*
 * @Author: 刘俊琪
 * @Date: 2022-01-20 11:44:52
 * @LastEditTime: 2022-01-20 12:06:02
 * @Description: 分类页点击详情
 */
import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../components/AppText";

function CategoryDetailScreen({ route }) {
  return (
    <View style={styles.container}>
      <AppText text={route.params.categoryName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryDetailScreen;
