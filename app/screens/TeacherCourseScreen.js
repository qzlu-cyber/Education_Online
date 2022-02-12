/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 17:49:43
 * @LastEditTime: 2022-02-12 18:10:12
 * @Description: 老师所有课程页
 */
import { StyleSheet, View, FlatList, Dimensions } from "react-native";

import Footer from "../components/Footer";
import ListItem from "../components/ListItem";

import { courses } from "../config/db";
import colors from "../config/colors";

const windowWidth = Dimensions.get("window").width;

export default function TeacherCourseScreen({ navigation }) {
  return (
    <View>
      <FlatList
        data={courses}
        keyExtractor={(course) => course.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            containerStyle={styles.itemContainer}
            imgStyle={styles.img}
            imgSource={item.imgSource}
            textContainerStyle={styles.textContainer}
            titleStyle={styles.courseName}
            title={item.courseName}
            subTitleStyle={styles.teacherName}
            subTitle={item.teacher}
            rate={item.rate}
            people={item.people}
            navigation={navigation}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  img: {
    width: 80,
    height: 90,
    borderRadius: 5,
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    width: windowWidth - 130,
  },
  courseName: {
    color: colors.boldText,
    fontSize: 22,
    overflow: "hidden",
  },
  teacherName: {
    color: colors.lightText,
    fontSize: 14,
  },
  rate: {
    flexDirection: "row",
    alignItems: "center",
  },
  people: {
    fontSize: 14,
    color: colors.lightText,
    marginHorizontal: 2,
  },
});
