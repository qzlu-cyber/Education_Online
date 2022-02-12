/*
 * @Author: 刘俊琪
 * @Date: 2022-02-12 17:47:07
 * @LastEditTime: 2022-02-12 17:51:20
 * @Description: 老师详情页导航器
 */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import TeacherInfoScreen from "../screens/TeacherInfoScreen";
import TeacherCourseScreen from "../screens/TeacherCourseScreen";

const MaterialTopTab = createMaterialTopTabNavigator();

export default function TeacherNavigator() {
  return (
    <MaterialTopTab.Navigator>
      <MaterialTopTab.Screen name='老师介绍' component={TeacherInfoScreen} />
      <MaterialTopTab.Screen name='所有课程' component={TeacherCourseScreen} />
    </MaterialTopTab.Navigator>
  );
}
