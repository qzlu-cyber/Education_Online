/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:49:57
 * @LastEditTime: 2022-04-06 19:08:55
 * @Description: 首页
 */
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Value, Transition, Transitioning } from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import { EvilIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppCategory from "../components/AppCategory";
import ListItem from "../components/ListItem";
import Footer from "../components/Footer";
import Search from "../components/Search";
import SearchBox from "../components/SearchBox";
import AppScrollView from "../components/AppScrollView";

import coursesApi from "../api/courses";

const transition = (
  <Transition.Together>
    <Transition.In type='scale' durationMs={400} />
    <Transition.Out type='scale' durationMs={400} />
  </Transition.Together>
);

/**
 * @description:
 * @param {*} navigation 导航页面 用于课程卡片跳转到课程详情页
 * @return {*}
 */
const windowWidth = Dimensions.get("window").width;

function HomeScreen({ navigation }) {
  const ref = useRef(null);
  const [search, setSearch] = useState(false);
  const translateY = useMemoOne(() => new Value(0), []);
  const showSearchBox = () => {
    if (!search && ref.current) {
      ref.current.animateNextTransition();
      setSearch(true);
    }
  };

  const [courses, setCourses] = useState([]); // 推荐课程
  const [popularCourses, setPopularCourses] = useState([]); // 受欢迎课程课程
  const [newestCourses, setNewestCourses] = useState([]); // 最新课程
  const [otherCourses, setOtherCourses] = useState([]); // 其他精品课程

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const response = await coursesApi.getCommandCourses();
    const popularResponse = await coursesApi.getPopularCourses();
    const newestResponse = await coursesApi.getNewestCourses();
    const otherResponse = await coursesApi.getOtherCourses();

    setCourses(response.data);
    setPopularCourses(popularResponse.data);
    setNewestCourses(newestResponse.data);
    setOtherCourses(otherResponse.data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Transitioning.View style={{ flex: 1 }} {...{ transition, ref }}>
        <Search {...{ translateY }} />
        <AppScrollView onPull={showSearchBox} {...{ translateY }}>
          <FlatList
            data={courses}
            keyExtractor={(course) => course._id}
            ListHeaderComponent={
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                  <View style={styles.text}>
                    <AppText style={styles.welcome} text='早上好，刘俊琪' />
                    <AppText style={styles.goal} text='今天打算学点什么？' />
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("个人信息")}>
                    <Image
                      source={require("../assets/avatar.jpg")}
                      style={styles.avatar}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                  <TextInput style={styles.search} placeholder='搜索' />
                  <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={() => {
                      navigation.navigate("更多", { categoryName: "搜索结果" });
                    }}>
                    <EvilIcons name='search' size={28} color='black' />
                  </TouchableOpacity>
                </View>
                <AppCategory
                  viewStyle={styles.category}
                  categoryNameStyle={styles.categoryName}
                  categoryName='最受欢迎'
                  categoryNameTextStyle={styles.categoryText}
                  cardContainerStyle={styles.cardContainer}
                  navigation={navigation}
                  data={popularCourses}
                />
                <AppCategory
                  viewStyle={styles.category}
                  categoryNameStyle={styles.categoryName}
                  categoryName='本月最多学习'
                  categoryNameTextStyle={styles.categoryText}
                  cardContainerStyle={styles.cardContainer}
                  navigation={navigation}
                  data={newestCourses}
                />
                <AppCategory
                  viewStyle={styles.category}
                  categoryNameStyle={styles.categoryName}
                  categoryName='本月最受欢迎老师'
                  categoryNameTextStyle={styles.categoryText}
                  cardContainerStyle={styles.cardContainer}
                  navigation={navigation}
                  teacherName='刘俊琪'
                  tel={13839935677}
                  email='qzlu3773@163.com'
                  info='红红火火'
                />
                <View style={styles.more}>
                  <AppText text='为您推荐' style={styles.listText} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("更多", {
                        categoryName: "为您推荐",
                        data: courses,
                      })
                    }>
                    <EvilIcons name='arrow-right' size={28} color='black' />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            }
            renderItem={({ item }) => (
              <ListItem
                containerStyle={styles.itemContainer}
                imgStyle={styles.img}
                imgUrl={item.cover}
                textContainerStyle={styles.textContainer}
                titleStyle={styles.courseName}
                title={item.name}
                subTitleStyle={styles.teacherName}
                subTitle={item.teacherName}
                rate={item.stars}
                people={item.saleNum}
                price={item.price}
                navigation={navigation}
              />
            )}
            ListFooterComponent={
              <View style={styles.other}>
                <View style={styles.more}>
                  <AppText text='其他精品课程' style={styles.listText} />
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("更多", {
                        categoryName: "其他精品课程",
                        data: courses,
                      })
                    }>
                    <EvilIcons name='arrow-right' size={28} color='black' />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={courses}
                  keyExtractor={(course) => course._id}
                  renderItem={({ item }) => (
                    <ListItem
                      containerStyle={styles.itemContainer}
                      imgStyle={styles.img}
                      imgUrl={item.cover}
                      textContainerStyle={styles.textContainer}
                      titleStyle={styles.courseName}
                      title={item.name}
                      subTitleStyle={styles.teacherName}
                      subTitle={item.teacherName}
                      rate={item.stars}
                      price={item.price}
                      people={item.saleNum}
                      navigation={navigation}
                    />
                  )}
                  ListFooterComponent={<Footer />}
                />
              </View>
            }
          />
        </AppScrollView>
        <SearchBox visible={search} onRequestClose={() => setSearch(false)} />
      </Transitioning.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight + 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 20,
    justifyContent: "center",
  },
  welcome: {
    fontStyle: "normal",
    fontSize: 20,
    fontWeight: "500",
    color: colors.boldText,
  },
  goal: {
    fontStyle: "normal",
    fontSize: 13,
    fontWeight: "normal",
    color: colors.lightText,
    letterSpacing: 0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginHorizontal: 20,
  },
  searchContainer: {
    justifyContent: "center",
  },
  search: {
    height: 60,
    marginHorizontal: 20,
    marginVertical: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.lightText,
    borderRadius: 5,
  },
  searchIcon: {
    position: "absolute",
    right: 30,
  },
  category: {
    marginBottom: 20,
  },
  categoryName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryText: {
    fontStyle: "normal",
    fontSize: 22,
    fontWeight: "500",
    color: colors.boldText,
    letterSpacing: 1,
  },
  cardContainer: {
    flexDirection: "row",
  },
  listText: {
    color: colors.boldText,
    fontSize: 22,
    marginHorizontal: 20,
    letterSpacing: 1,
    marginBottom: 10,
  },
  //item
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: "hidden",
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
  other: {
    marginTop: 20,
  },
  more: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    alignItems: "center",
  },
});

export default HomeScreen;
