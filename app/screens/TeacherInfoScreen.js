/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 17:49:05
 * @LastEditTime: 2022-02-12 18:07:20
 * @Description: 老师介绍页
 */
import { StyleSheet, Text, View } from "react-native";

export default function TeacherInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TeacherInfoScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
  },
});
