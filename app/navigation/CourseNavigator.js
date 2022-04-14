/*
 * @Author: 刘俊琪
 * @Date: 2022-01-23 17:30:12
 * @LastEditTime: 2022-04-14 14:31:53
 * @Description: 描述
 */
import React, { useEffect, useState, Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AutoHeightWebView from "react-native-autoheight-webview";

import AppComment from "../components/AppComment";
import colors from "../config/colors";
import Chapters from "../components/Chapters";

import coursesApi from "../api/courses";

const MaterialTopTab = createMaterialTopTabNavigator();

const CourseDetailTab = () => (
  <MaterialTopTab.Navigator>
    <MaterialTopTab.Screen name='课程介绍' component={CourseInfoScreen} />
    <MaterialTopTab.Screen name='课程目录' component={CourseCatelogScreen} />
    <MaterialTopTab.Screen name='课程评价' component={CourseJudgementScreen} />
  </MaterialTopTab.Navigator>
);

let courseDetail;
let myCourse;

export default function CourseNavigator({ course, isMyCourse }) {
  courseDetail = course;
  myCourse = isMyCourse;

  return <CourseDetailTab />;
}

function CourseCatelogScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {courseDetail.courseDetail.map((item, index) => {
        return (
          <Chapters
            key={index}
            color='#fde6e6'
            percent={25}
            duration='2 hours, 20 minutes'
            title={item.title}
            num={index + 1}
            navigation={navigation}
            bg={colors.test}
            videoUri={item.uri}
            myCourse={myCourse}
          />
        );
      })}
    </ScrollView>
  );
}

//autoGetHeight
const BaseScript = `
    (function () {
        var height = null;
        function changeHeight() {
          if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.postMessage) {
              window.postMessage(JSON.stringify({
                type: 'setHeight',
                height: height,
              }))
            }
          }
        }
        setTimeout(changeHeight, 300);
    } ())
    `;
class CourseInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWebView: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showWebView: true,
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.courseInfoContainer}>
        {Platform.OS === "ios" && (
          <AutoHeightWebView
            ref={(ref) => {
              this.webview = ref;
            }}
            style={{
              width: Dimensions.get("window").width - 20,
              marginTop: 10,
            }}
            source={{ html: `${courseDetail.description}` }}
            onNavigationStateChange={(event) => {
              if (event.url) {
                this.setState({ link: event.url });
                this.webview.stopLoading();
                if (event.url !== "about:blank") {
                  Linking.openURL(event.url).catch((err) => console.error(err));
                }
              }
            }}
          />
        )}
        {Platform.OS === "android" && this.state.showWebView && (
          <AutoHeightWebView
            ref={(ref) => {
              this.webview = ref;
            }}
            style={{
              width: Dimensions.get("window").width - 20,
              marginTop: 10,
            }}
            source={{ html: `${courseDetail.description}` }}
            onLoadStart={() => {
              Platform.select({
                android: () => this.webview.goBack(),
              })();
            }}
            onShouldStartLoadWithRequest={(event) => {
              if (event.url === "about:blank") return false;
              else {
                Linking.openURL(event.url).catch((err) => console.error(err));
                return true;
              }
            }}
          />
        )}
      </View>
    );
  }
}

function CourseJudgementScreen({ navigation }) {
  const [comments, setComments] = useState([]);
  const getCourseComments = async () => {
    const result = await coursesApi.getJudge(courseDetail._id);

    if (result.ok) {
      setComments(result.data.comments);
    }
  };

  useEffect(() => {
    getCourseComments();
  }, []);

  return (
    <FlatList
      data={comments}
      keyExtractor={(index) => index}
      renderItem={({ item }) => (
        <AppComment
          nickName={item.userName}
          avatar={item.avatar}
          content={item.comment}
          star={item.stars}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingVertical: 10,
  },
  chapterContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  chapterText: {
    fontSize: 18,
    color: colors.lightText,
  },
  itemContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e2e4",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.lightText,
  },
  //
  courseInfoContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
});
