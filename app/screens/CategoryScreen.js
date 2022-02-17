/**
 * Inspiration: https://dribbble.com/shots/3431451-HUNGRY
 */
import * as React from "react";
import {
  TouchableOpacity,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { icons } from "../config/db";
import colors from "../config/colors";
import AppSwiper from "../components/AppSwiper";

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;

const { width, height } = Dimensions.get("window");

const Icon = React.memo(({ icon, color }) => {
  return <FontAwesome5 name={icon} color={color} size={ICON_SIZE} />;
});

const Item = React.memo(({ icon, color, name, showText }) => {
  return (
    <View style={styles.itemWrapper}>
      {showText ? (
        <Text style={[styles.itemText, { color }]}>{name}</Text>
      ) : (
        // for spacing purposes
        <View />
      )}
      <Icon icon={icon} color={color} />
    </View>
  );
});

const ConnectWithText = React.memo(() => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 - ITEM_HEIGHT * 2,
        width: width * 0.7,
        paddingHorizontal: 14,
      }}>
      <Text
        style={{
          color: colors.praimary,
          fontSize: 50,
          fontWeight: "500",
          lineHeight: 60,
        }}>
        分类
      </Text>
    </View>
  );
});

const ConnectButton = React.memo(({ onPress }) => {
  return (
    <View
      style={{
        position: "absolute",
        top: height / 2 + ITEM_HEIGHT / 2,
        paddingHorizontal: 14,
      }}>
      <View
        style={{
          height: ITEM_HEIGHT * 2,
          width: 4,
          backgroundColor: colors.praimary,
        }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          backgroundColor: colors.praimary,
          alignItems: "center",
          justifyContent: "center",
        }}
        activeOpacity={0.8}>
        <Text style={{ fontSize: 32, fontWeight: "400", color: colors.dark }}>
          确认
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const List = React.memo(
  React.forwardRef(({ showText, style, onScroll, onItemIndexChange }, ref) => {
    return (
      <Animated.FlatList
        ref={ref}
        data={icons}
        style={style}
        keyExtractor={(item) => `${item.name}-${item.icon}`}
        bounces={false}
        scrollEnabled={!showText}
        scrollEventThrottle={16}
        onScroll={onScroll}
        decelerationRate='fast'
        snapToInterval={ITEM_HEIGHT}
        showsVerticalScrollIndicator={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          paddingTop: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
          paddingBottom: showText ? 0 : height / 2 - ITEM_HEIGHT / 2,
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => {
          return <Item {...item} color={item.color} showText={showText} />;
        }}
        onMomentumScrollEnd={(ev) => {
          const newIndex = Math.round(
            ev.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );

          if (onItemIndexChange) {
            onItemIndexChange(newIndex);
          }
        }}
      />
    );
  })
);
export default function CategoryScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const onConnectPress = React.useCallback(() => {
    navigation.navigate("更多", {
      categoryName: icons[index].name,
    });
  }, [index]); //TODO: 点按动作
  const praimaryRef = React.useRef();
  const darkRef = React.useRef();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );
  const onItemIndexChange = React.useCallback(setIndex, []);
  React.useEffect(() => {
    scrollY.addListener((v) => {
      if (darkRef?.current) {
        darkRef.current.scrollToOffset({
          offset: v.value,
          animated: false,
        });
      }
    });
  });

  return (
    <View style={styles.container}>
      <ConnectWithText />
      <View
        style={{
          width: "100%",
          height: 200,
          zIndex: 1,
          position: "absolute",
          top: 0,
        }}>
        <AppSwiper />
      </View>
      <List
        ref={praimaryRef}
        style={StyleSheet.absoluteFillObject}
        onScroll={onScroll}
        onItemIndexChange={onItemIndexChange}
      />
      <List
        ref={darkRef}
        showText
        style={{
          position: "absolute",
          backgroundColor: colors.praimary,
          width,
          height: ITEM_HEIGHT,
          top: height / 2 - ITEM_HEIGHT / 2,
        }}
      />
      <ConnectButton onPress={onConnectPress} />
      <Item />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 26,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
