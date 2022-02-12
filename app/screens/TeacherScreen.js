/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 16:41:34
 * @LastEditTime: 2022-02-12 18:07:09
 * @Description: 老师详情页
 */
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Title, Caption, Text } from "react-native-paper";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import TeacherNavigator from "../navigation/TeacherNavigator";
import colors from "../config/colors";

const TeacherScreen = ({ route }) => {
  const { teacherName, tel, email, info } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {teacherName}
            </Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialIcons name='article' size={20} color='#777777' />
          <Text style={styles.text}>{info}</Text>
        </View>
        <View style={styles.row}>
          <Feather name='smartphone' size={20} color='#777777' />
          <Text style={styles.text}>{tel}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name='email' size={20} color='#777777' />
          <Text style={styles.text}>{email}</Text>
        </View>
      </View>
      <TeacherNavigator />
    </SafeAreaView>
  );
};

export default TeacherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  text: { color: "#777777", marginLeft: 5 },
});
