/*
 * @Author: 刘俊琪
 * @Date: 2022-01-07 18:52:21
 * @LastEditTime: 2022-01-23 19:02:13
 * @Description: 程序入口
 */
import { NavigationContainer } from "@react-navigation/native";

import AccountNavigator from "./app/navigation/AccountNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AccountNavigator />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
}
