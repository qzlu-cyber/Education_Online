/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:30:12
 * @LastEditTime: 2022-02-12 17:54:01
 * @Description: 描述
 */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import CourseInfoScreen from "../screens/CourseInfoScreen";
import CourseCatelogScreen from "../screens/CourseCatelogScreen";
import CourseJudgementScreen from "../screens/CourseJudgementScreen";

const MaterialTopTab = createMaterialTopTabNavigator();

const CourseDetailTab = () => (
  <MaterialTopTab.Navigator>
    <MaterialTopTab.Screen name='课程介绍' component={CourseInfoScreen} />
    <MaterialTopTab.Screen name='课程目录' component={CourseCatelogScreen} />
    <MaterialTopTab.Screen name='课程评价' component={CourseJudgementScreen} />
  </MaterialTopTab.Navigator>
);

export default function CourseNavigator() {
  return <CourseDetailTab />;
}
