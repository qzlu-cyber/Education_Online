/*
 * @Author: 刘俊琪
 * @Date: 2022-01-07 18:52:21
 * @LastEditTime: 2022-01-20 15:22:59
 * @Description: 描述
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import CategoryScreen from "./app/screens/CategoryScreen";
import HomeScreen from "./app/screens/HomeScreen";
import LearningScreen from "./app/screens/LearningScreen";
import MyScreen from "./app/screens/MyScreen";
import OnBoardingScreen from "./app/screens/OnBoardScreen";
import CategoryDetailScreen from "./app/screens/CategoryDetailScreen";
import colors from "./app/config/colors";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    activeColor={colors.praimary}
    inactiveColor={colors.boldText}
    barStyle={{ backgroundColor: colors.white }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name == "首页") iconName = "home";
        else if (route.name == "分类") iconName = "archive";
        else if (route.name == "学习") iconName = "book-open";
        else if (route.name == "我的") iconName = "user-alt";
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}>
    <Tab.Screen name='首页' component={HomeScreen} />
    <Tab.Screen name='分类' component={CategoryScreen} />
    <Tab.Screen name='学习' component={LearningScreen} />
    <Tab.Screen name='我的' component={MyScreen} />
  </Tab.Navigator>
);

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='首页' component={TabNavigator} />
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

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
