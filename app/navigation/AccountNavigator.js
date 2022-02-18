/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 18:47:19
 * @LastEditTime: 2022-02-18 16:04:15
 * @Description: 我的 页导航
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import AppNavigator from "./AppNavigator";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import VideoScreen from "../screens/VideoScreen";
import CourseCatelogScreen from "../screens/CourseCatelogScreen";
import ProfileScreen from "../screens/ProfileScreen";
import colors from "../config/colors";
import MoreScreen from "../screens/MoreScreen";
import TeacherScreen from "../screens/TeacherScreen";
import SettingScreen from "../screens/SettingScreen";
import ArticleScreen from "../screens/ArticleScreen";
import EditArticleScreen from "../screens/EditArticleScreen";
import ChatScreen from "../screens/ChatScreen";
import CourseJudgementScreen from "../screens/CourseJudgementScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, headerBackTitle: "返回" }}>
    <Stack.Screen name='首页' component={AppNavigator} />
    <Stack.Screen
      name='课程详情'
      component={CourseDetailScreen}
      options={({ route }) => ({
        title: route.params.courseName,
        headerShown: true,
      })}
    />
    <Stack.Screen name='视频' component={VideoScreen} />
    <Stack.Screen name='目录' component={CourseCatelogScreen} />
    <Stack.Screen
      name='个人信息'
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity>
            <Entypo name='paper-plane' size={24} color={colors.praimary} />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name='更多'
      component={MoreScreen}
      options={({ route }) => ({
        title: route.params.categoryName,
        headerShown: true,
      })}
    />
    <Stack.Screen
      name='老师详情'
      component={TeacherScreen}
      options={({ route }) => ({
        title: route.params.teacherName,
        headerShown: true,
      })}
    />
    <Stack.Screen
      name='动态详情'
      component={ArticleScreen}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name='发帖'
      component={EditArticleScreen}
      options={{
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity>
            <Entypo name='paper-plane' size={24} color={colors.praimary} />
          </TouchableOpacity>
        ),
      }}
    />
    <Stack.Screen
      name='聊天'
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerShown: true,
      })}
    />
    <Stack.Screen name='评论' component={CourseJudgementScreen} />
    <Stack.Screen
      name='设置'
      component={SettingScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
