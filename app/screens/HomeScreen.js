/*
 * @Author: 刘俊琪
 * @Date: 2022-01-08 10:49:57
 * @LastEditTime: 2022-04-21 19:46:40
 * @Description: 首页
 */
import React, { useEffect, useState } from "react";
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
  RefreshControl,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

import useAuth from "../auth/useAuth";

import colors from "../config/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppCategory from "../components/AppCategory";
import ListItem from "../components/ListItem";
import Footer from "../components/Footer";
import ActivityIndicator from "../components/ActivityIndicator";

import coursesApi from "../api/courses";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";

/**
 * @description:
 * @param {*} navigation 导航页面 用于课程卡片跳转到课程详情页
 * @return {*}
 */
const windowWidth = Dimensions.get("window").width;

function HomeScreen({ navigation }) {
  const { user } = useAuth();

  const [avatar, setAvatar] = useState(
    "https://s1.ax1x.com/2020/08/01/a3Pbff.jpg"
  );

  const [myCourses, setMyCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchByName, setSearchByName] = useState("");

  const getCommandCourses = useApi(coursesApi.getCommandCourses);
  const getPopularCourses = useApi(coursesApi.getPopularCourses);
  const getNewestCourses = useApi(coursesApi.getNewestCourses);
  const getOtherCourses = useApi(coursesApi.getOtherCourses);

  const getMyInfo = async () => {
    const result = await usersApi.getMyInfo();
    if (result.ok) {
      setAvatar(`data:image/jpeg;base64,${result.data.avatar}`);
      setMyCourses(result.data.courses);
    }
  };

  const getTeachers = async () => {
    const result = await usersApi.getTeachers();

    if (result.ok) {
      setTeachers(result.data);
    }
  };

  const getTodayDate = () => {
    const date = new Date();

    const hour = date.getHours().toString();

    if (hour >= 5 && hour <= 10) {
      return "早上好";
    } else if (hour >= 11 && hour <= 13) {
      return "中午好";
    } else if (hour >= 14 && hour <= 18) {
      return "下午好";
    } else {
      return "晚上好";
    }
  };

  useEffect(() => {
    getCommandCourses.request();
    getPopularCourses.request();
    getNewestCourses.request();
    getOtherCourses.request();

    getMyInfo();
    getTeachers();
  }, []);

  const handleRetry = () => {
    getCommandCourses.request();
    getPopularCourses.request();
    getNewestCourses.request();
    getOtherCourses.request();

    getMyInfo();
    getTeachers();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator visiable={getNewestCourses.loading} />
      {getCommandCourses.error && (
        <>
          <AppText text='连接服务器失败，请检查网络...' />
          <AppButton title='重试' style={styles.button} onPress={handleRetry} />
        </>
      )}
      {!getCommandCourses.error && (
        <FlatList
          data={getCommandCourses.data}
          keyExtractor={(course) => course._id}
          refreshControl={<RefreshControl onRefresh={handleRetry} />}
          ListHeaderComponent={
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View style={styles.text}>
                  <AppText
                    style={styles.welcome}
                    text={getTodayDate() + "，" + user.name}
                  />
                  <AppText style={styles.goal} text='打算学点什么？' />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("聊天列表", {
                      user: user,
                    })
                  }>
                  <Image source={{ uri: avatar }} style={styles.avatar} />
                </TouchableOpacity>
              </View>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.search}
                  placeholder='搜索'
                  onChangeText={(text) => setSearchByName(text)}
                  value={searchByName}
                />
                <TouchableOpacity
                  style={styles.searchIcon}
                  onPress={
                    searchByName
                      ? () => {
                          navigation.navigate("更多", {
                            categoryName: "搜索结果",
                            myCourses: myCourses,
                            isSearch: true,
                            searchByName,
                          });
                          setSearchByName("");
                        }
                      : () => {}
                  }>
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
                data={getPopularCourses.data}
                myCourses={myCourses}
              />
              <AppCategory
                viewStyle={styles.category}
                categoryNameStyle={styles.categoryName}
                categoryName='最新上架'
                categoryNameTextStyle={styles.categoryText}
                cardContainerStyle={styles.cardContainer}
                navigation={navigation}
                data={getNewestCourses.data}
                myCourses={myCourses}
              />
              <AppCategory
                viewStyle={styles.category}
                categoryNameStyle={styles.categoryName}
                categoryName='最受欢迎老师'
                categoryNameTextStyle={styles.categoryText}
                cardContainerStyle={styles.cardContainer}
                navigation={navigation}
                teacherName='刘俊琪'
                tel={13839935677}
                email='qzlu3773@163.com'
                info='红红火火'
                data={teachers}
                myCourses
              />
              <View style={styles.more}>
                <AppText text='为您推荐' style={styles.listText} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("更多", {
                      categoryName: "为您推荐",
                      data: getCommandCourses.data,
                      myCourses,
                    })
                  }>
                  <EvilIcons name='arrow-right' size={28} color='black' />
                </TouchableOpacity>
              </View>
            </ScrollView>
          }
          renderItem={({ item }) => {
            return (
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
                item={item}
                mycourse={myCourses.includes(item._id)}
                navigation={navigation}
              />
            );
          }}
          ListFooterComponent={
            <View style={styles.other}>
              <View style={styles.more}>
                <AppText text='其他精品课程' style={styles.listText} />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("更多", {
                      categoryName: "其他精品课程",
                      data: getCommandCourses.data,
                      myCourses,
                    })
                  }>
                  <EvilIcons name='arrow-right' size={28} color='black' />
                </TouchableOpacity>
              </View>
              <FlatList
                data={getCommandCourses.data}
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
                    item={item}
                    mycourse={myCourses.includes(item._id)}
                    navigation={navigation}
                  />
                )}
                ListFooterComponent={<Footer />}
              />
            </View>
          }
        />
      )}
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
  //重试按钮
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.praimary,
    marginVertical: 20,
  },
});

export default HomeScreen;
