/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:30:12
 * @LastEditTime: 2022-01-23 19:06:28
 * @Description: 描述
 */
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import colors from "../config/colors";
import CourseInfoScreen from "./CourseInfoScreen";
import CourseCatelogScreen from "./CourseCatelogScreen";
import CourseJudgementScreen from "./CourseJudgementScreen";

const MaterialTopTab = createMaterialTopTabNavigator();

const CourseDetailTab = () => (
  <MaterialTopTab.Navigator
    screenOptions={{ tabBarStyle: { backgroundColor: colors.praimary } }}>
    <MaterialTopTab.Screen name='课程介绍' component={CourseInfoScreen} />
    <MaterialTopTab.Screen name='课程目录' component={CourseCatelogScreen} />
    <MaterialTopTab.Screen name='课程评价' component={CourseJudgementScreen} />
  </MaterialTopTab.Navigator>
);

export default function CourseNavigator() {
  return <CourseDetailTab />;
}
