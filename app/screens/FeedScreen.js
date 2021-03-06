/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 11:03:19
 * @LastEditTime: 2022-04-21 19:22:28
 * @Description: 动态页
 */
import React, { useEffect } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import ActionButton from "react-native-action-button";

import PostCard from "../components/PostCard";

import articlesApi from "../api/articles";
import useApi from "../hooks/useApi";

const FeedScreen = ({ navigation }) => {
  const getArticles = useApi(articlesApi.getArticles);

  useEffect(() => {
    getArticles.request();
  }, []);

  const handleRetry = () => {
    getArticles.request();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedContainer}>
        <FlatList
          data={getArticles.data}
          refreshControl={<RefreshControl onRefresh={handleRetry} />}
          renderItem={({ item }) => (
            <PostCard key={item._id} item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <ActionButton
        buttonColor='#2e64e5'
        onPress={() => navigation.navigate("发帖")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  feedContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default FeedScreen;
