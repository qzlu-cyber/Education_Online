/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 12:18:55
 * @LastEditTime: 2022-01-24 17:58:08
 * @Description: Footer组件
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function Footer(props) {
  return (
    <View style={styles.container}>
      <AntDesign name='codesquareo' size={24} style={styles.icon} />
      <AppText text='你已经看到了我的底线' style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    color: colors.lightText,
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 20,
  },
  icon: {
    marginTop: 20,
    color: colors.lightText,
  },
});

export default Footer;
