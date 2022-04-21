/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 18:37:22
 * @LastEditTime: 2022-04-21 19:00:34
 * @Description: icon更多
 */
import React, { useMemo, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";

import AppCard from "../components/AppCard";
import colors from "../config/colors";

import coursesApi from "../api/courses";
import useApi from "../hooks/useApi";

export default function MoreScreen({ navigation, route }) {
  const getCourses = useApi(coursesApi.searchByTag);
  if (route.params.getCoursesByTag) {
    useEffect(() => {
      getCourses.request(route.params.categoryName);
    }, []);
  }

  const searchCourses = useApi(coursesApi.search);
  if (route.params.isSearch) {
    useEffect(() => {
      searchCourses.request(route.params.searchByName);
    }, []);
  }

  return (
    <View style={styles.container}>
      {route.params.getCoursesByTag && (
        <MasonryList
          numColumns={2}
          data={getCourses.data}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            let randomBool = Math.random() < 0.5;
            return (
              <AppCard
                cardStyle={styles.card}
                imageStyle={[styles.img, { height: randomBool ? 140 : 200 }]}
                item={item}
                textStyle={styles.title}
                navigation={navigation}
                myCourses={route.params.myCourses}
              />
            );
          }}
          onRefresh={() => getCourses.request(route.params.categoryName)}
        />
      )}
      {!route.params.getCoursesByTag && !route.params.isSearch && (
        <MasonryList
          numColumns={2}
          data={route.params.data}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const randomBool = useMemo(() => Math.random() < 0.5, []);
            return (
              <AppCard
                cardStyle={styles.card}
                imageStyle={[styles.img, { height: randomBool ? 140 : 200 }]}
                item={item}
                textStyle={styles.title}
                navigation={navigation}
                myCourses={route.params.myCourses}
              />
            );
          }}
        />
      )}
      {!route.params.getCoursesByTag && route.params.isSearch && (
        <MasonryList
          numColumns={2}
          data={searchCourses.data}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            let randomBool = Math.random() < 0.5;
            return (
              <AppCard
                cardStyle={styles.card}
                imageStyle={[styles.img, { height: randomBool ? 140 : 200 }]}
                item={item}
                textStyle={styles.title}
                navigation={navigation}
                myCourses={route.params.myCourses}
              />
            );
          }}
          onRefresh={() => searchCourses.request(route.params.searchByName)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
  img: {
    width: 180,
    borderRadius: 5,
    overflow: "hidden",
  },
  title: {
    position: "absolute",
    bottom: 10,
    color: colors.boldText,
    fontSize: 20,
  },
});
