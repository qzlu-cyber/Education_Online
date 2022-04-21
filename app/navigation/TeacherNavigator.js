/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 17:47:07
 * @LastEditTime: 2022-04-21 18:33:05
 * @Description: 老师详情页导航器
 */
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Footer from "../components/Footer";
import ListItem from "../components/ListItem";

import colors from "../config/colors";

const windowWidth = Dimensions.get("window").width;

const MaterialTopTab = createMaterialTopTabNavigator();

let teacher;
export default function TeacherNavigator(props) {
  const navigation = useNavigation();
  teacher = props.teacher;

  return (
    <MaterialTopTab.Navigator>
      <MaterialTopTab.Screen name='老师介绍' component={TeacherInfoScreen} />
      <MaterialTopTab.Screen
        name='所有课程'
        component={() => (
          <View>
            <FlatList
              data={props.courses}
              keyExtractor={(course) => course._id}
              renderItem={({ item }) => {
                return (
                  <ListItem
                    containerStyle={styles.itemContainer}
                    imgStyle={styles.img}
                    textContainerStyle={styles.textContainer}
                    titleStyle={styles.courseName}
                    title={item.name}
                    subTitleStyle={styles.teacherName}
                    subTitle={teacher.name}
                    rate={item.stars}
                    people={item.saleNum}
                    price={item.price}
                    item={item}
                    navigation={navigation}
                    mycourse={props.myCourses}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={<Footer />}
            />
          </View>
        )}
      />
    </MaterialTopTab.Navigator>
  );
}

function TeacherInfoScreen() {
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
