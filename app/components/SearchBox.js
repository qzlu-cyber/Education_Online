/*
 * @Author: 刘俊琪
 * @Date: 2020-08-04 11:27:15
 * @LastEditTime: 2022-02-14 12:45:28
 * @Description: 描述
 */
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    borderRadius: 16,
    backgroundColor: "#fdfcff",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#e6e5ea",
    borderRadius: 8,
    marginRight: 8,
    height: 32,
    padding: 4,
  },
  button: {
    borderRadius: 8,
    padding: 4,
    paddingHorizontal: 8,
    justifyContent: "center",
    height: 32,
  },
  content: {
    marginTop: 32,
  },
});

export default ({ visible, onRequestClose }) => {
  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <View
        style={[styles.root, { opacity: visible ? 1 : 0 }]}
        pointerEvents={visible ? "auto" : "none"}>
        {visible && (
          <View style={styles.container}>
            <View style={styles.row}>
              <TextInput
                placeholder='搜索课程或老师'
                underlineColorAndroid='transparent'
                style={styles.input}
              />
              <RectButton onPress={onRequestClose} style={styles.button}>
                <Text>取消</Text>
              </RectButton>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
