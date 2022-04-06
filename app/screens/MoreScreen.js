/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 18:37:22
 * @LastEditTime: 2022-04-06 19:06:26
 * @Description: icon更多
 */
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";

import AppCard from "../components/AppCard";
import colors from "../config/colors";
import { moreData } from "../config/db";

export default function MoreScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
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
            />
          );
        }}
      />
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
