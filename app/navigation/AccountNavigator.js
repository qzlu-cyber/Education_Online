/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 18:47:19
 * @LastEditTime: 2022-01-21 18:52:08
 * @Description: 我的 页导航
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigator from "./AppNavigator";
import CategoryDetailScreen from "../screens/CategoryDetailScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='首页' component={AppNavigator} />
    <Stack.Screen
      name='分类详情'
      component={CategoryDetailScreen}
      options={({ route }) => ({
        title: route.params.categoryName,
        headerShown: true,
      })}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
