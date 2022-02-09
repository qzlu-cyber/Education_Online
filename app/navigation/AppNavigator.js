/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 18:49:03
 * @LastEditTime: 2022-02-09 15:51:25
 * @Description: 底部主导航
 */
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import colors from "../config/colors";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import MyScreen from "../screens/MyScreen";
import MyCourcesScreen from "../screens/MyCourcesScreen";
import CourseEditScreen from "../screens/CourseEditScreen";

const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    activeColor={colors.praimary}
    inactiveColor={colors.boldText}
    barStyle={{ backgroundColor: colors.white }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name == "首") iconName = "home";
        else if (route.name == "分类") iconName = "archive";
        else if (route.name == "发布") iconName = "plus-circle";
        else if (route.name == "学习") iconName = "book-open";
        else if (route.name == "我的") iconName = "user-alt";
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}>
    <Tab.Screen name='首' component={HomeScreen} />
    <Tab.Screen name='分类' component={CategoryScreen} />
    <Tab.Screen name='发布' component={CourseEditScreen} />
    <Tab.Screen name='学习' component={MyCourcesScreen} />
    <Tab.Screen name='我的' component={MyScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
