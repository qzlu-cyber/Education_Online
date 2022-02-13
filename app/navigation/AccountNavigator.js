/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 18:47:19
 * @LastEditTime: 2022-02-13 14:11:17
 * @Description: 我的 页导航
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigator from "./AppNavigator";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";
import VideoScreen from "../screens/VideoScreen";
import CourseCatelogScreen from "../screens/CourseCatelogScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Button } from "react-native";
import colors from "../config/colors";
import MoreScreen from "../screens/MoreScreen";
import TeacherScreen from "../screens/TeacherScreen";
import SettingScreen from "../screens/SettingScreen";
import ArticleScreen from "../screens/ArticleScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false, headerBackTitle: "返回" }}>
    <Stack.Screen name='首页' component={AppNavigator} />
    <Stack.Screen
      name='分类详情'
      component={CategoryDetailScreen}
      options={({ route }) => ({
        title: route.params.categoryName,
        headerShown: true,
      })}
    />
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
        headerRight: () => <Button title='提交' color={colors.praimary} />,
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
      name='设置'
      component={SettingScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
