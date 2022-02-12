/*
 * @Author: 刘俊琪
 * @Date: 2022-01-09 12:18:55
 * @LastEditTime: 2022-02-12 18:10:52
 * @Description: Footer组件
 */
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

function Footer() {
  return (
    <View style={styles.container}>
      <AntDesign name='codesquareo' size={16} style={styles.icon} />
      <AppText text='你已经看到了我的底线' style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    color: colors.lightText,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 10,
  },
  icon: {
    marginTop: 10,
    color: colors.lightText,
  },
});

export default Footer;
