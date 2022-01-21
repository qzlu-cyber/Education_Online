/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 18:42:25
 * @LastEditTime: 2022-01-21 18:45:32
 * @Description: 欢迎页导航
 */
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnBoardingScreen from "../screens/OnBoardScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name='欢迎' component={OnBoardingScreen} />
    <Stack.Screen name='注册' component={RegisterScreen} />
    <Stack.Screen name='登陆' component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
