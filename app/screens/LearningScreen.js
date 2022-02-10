// /*
//  * @Author: 刘俊琪
//  * @Date: 2022-01-09 15:18:36
//  * @LastEditTime: 2022-01-23 17:43:10
//  * @Description: 继续学习页面
//  */
// import React from "react";
// import {
//   StatusBar,
//   StyleSheet,
//   FlatList,
//   SafeAreaView,
//   Platform,
// } from "react-native";

// import ListItem from "../components/ListItem";
// import colors from "../config/colors";

// import { myCourses } from "../config/db";

// function LearningScreen(props) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={myCourses}
//         keyExtractor={(myCourse) => myCourse.id.toString()}
//         renderItem={({ item }) => (
//           <ListItem
//             containerStyle={styles.itemContainer}
//             imgStyle={styles.img}
//             imgSource={item.imgSource}
//             textContainerStyle={styles.textContainer}
//             titleStyle={styles.courseName}
//             title={item.courseName}
//             subTitleStyle={styles.teacherName}
//             subTitle={item.teacher}
//             rate={item.rate}
//             people={item.people}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
//   },
//   imgStyle: {
//     width: 180,
//     height: 120,
//     borderRadius: 5,
//   },
//   card: {
//     flexDirection: "row",
//     marginHorizontal: 20,
//     marginVertical: 10,
//   },
//   text: {
//     marginLeft: 10,
//     fontSize: 24,
//     color: colors.boldText,
//   },
//   subText: {
//     color: colors.lightText,
//     fontSize: 14,
//     marginLeft: 10,
//     marginVertical: 10,
//   },
//   //item
//   itemContainer: {
//     flexDirection: "row",
//     marginHorizontal: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     shadowColor: "#E0E0E0",
//     shadowOffset: { width: 5, height: 5 },
//     shadowOpacity: 0.7,
//     elevation: 20,
//     overflow: "hidden",
//   },
//   img: {
//     width: 80,
//     height: 90,
//     borderRadius: 5,
//   },
//   textContainer: {
//     marginHorizontal: 10,
//     justifyContent: "space-between",
//   },
//   courseName: {
//     color: colors.boldText,
//     fontSize: 22,
//   },
//   teacherName: {
//     color: colors.lightText,
//     fontSize: 14,
//   },
//   rate: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   people: {
//     fontSize: 14,
//     color: colors.lightText,
//     marginHorizontal: 2,
//   },
// });

// export default LearningScreen;

/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ProgressCircle from "react-native-progress-circle";

import { getMovies } from "../config/api";
import Genres from "../components/Genres";
import AppText from "../components/AppText";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <AppText text='加载中...' style={styles.paragraph} />
  </View>
);

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + "-backdrop"}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}>
              <Image
                source={{ uri: item.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
                resizeMode='cover'
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};

export default function LearningScreen({ navigation }) {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: "empty-left" }, ...movies, { key: "empty-right" }]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}>
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Genres genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
                <View style={styles.duration}>
                  <AppText text='共10小时37分钟' style={styles.subtitle} />
                  <View style={styles.time}>
                    <AppText text='已学习25%' style={styles.progress} />
                    <ProgressCircle
                      percent={25}
                      radius={17}
                      borderWidth={1.5}
                      color='#f58084'
                      shadowColor='#FFF'
                      bgColor='#fff2f2'>
                      <Image source={require("../assets/images/pl.png")} />
                    </ProgressCircle>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  duration: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  subtitle: {
    color: "#f58084",
    fontSize: 12,
  },
  progress: {
    color: "#345c74",
    fontSize: 13,
    marginRight: 5,
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
