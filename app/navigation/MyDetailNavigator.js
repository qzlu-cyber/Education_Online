/*
 * @Author: 刘俊琪
 * @Date: 2022-01-20 13:21:25
 * @LastEditTime: 2022-02-12 17:56:10
 * @Description: '我的'页MaterialTopTabNavigator，导航到收藏，历史等
 */
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FavoriteScreen from "../screens/FavoriteScreen";
import HistoryScreen from "../screens/HistoryScreen";
import colors from "../config/colors";

const MaterialTopTab = createMaterialTopTabNavigator();

const MyDetailTab = () => (
  <MaterialTopTab.Navigator
    screenOptions={{ tabBarStyle: { backgroundColor: colors.white } }}>
    <MaterialTopTab.Screen name='收藏' component={FavoriteScreen} />
    <MaterialTopTab.Screen name='历史' component={HistoryScreen} />
  </MaterialTopTab.Navigator>
); //‘我的’页面中的导航器，导航到‘我的收藏’等页面

function MyDetailNavigator() {
  return <MyDetailTab />;
}

export default MyDetailNavigator;
