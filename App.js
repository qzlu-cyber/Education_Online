/*
 * @Author: 刘俊琪
 * @Date: 2022-01-07 18:52:21
 * @LastEditTime: 2022-04-10 17:56:04
 * @Description: 程序入口
 */
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

import AccountNavigator from "./app/navigation/AccountNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AccountNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
