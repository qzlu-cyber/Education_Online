/*
 * @Author: 刘俊琪
 * @Date: 2022-02-09 15:46:38
 * @LastEditTime: 2022-04-11 07:48:18
 * @Description: 发布课程
 */
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";

import AppTextInput from "../components/AppTextInput";
import colors from "../config/colors";
import ImageInput from "../components/ImageInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import EditArticleScreen from "./EditArticleScreen";

import coursesApi from "../api/courses";

export default function CourseEditScreen() {
  const [videoNum, setVideoNum] = useState([0]);
  const [count, setCount] = useState(1);
  const [icon, setIcon] = useState("md-arrow-down");

  const [courseName, setCourseName] = useState("");
  const [cover, setCover] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [courseDetails, setCourseDetails] = useState([]);

  // const [videoUri, setVideoUri] = useState(); 不知道为什么不工作。。。

  let obj = {};

  const handlePress = () => {
    setCount(count + 1);
    videoNum.push(count);
    setVideoNum(videoNum);
  };

  const getCourseDescription = (value) => {
    setDescription(value);
  };

  const getVideoUri = (value) => {
    obj.uri = value;
    if (obj.uri) {
      courseDetails.push(obj);
      setCourseDetails(courseDetails);
    }
  };

  const getCoverUri = (value) => {
    setCover(value);
  };

  const handleOpen = () => {
    if (Platform.OS === "ios") setIcon("md-arrow-up");
  };

  const handleClose = () => {
    setIcon("md-arrow-down");
  };

  //删除已选的视频后会有冗余，调用此函数去重
  function arrayUtil(arr, key) {
    let returnArr = [];
    if (key) {
      // 对象数组去重
      const obj = {};
      returnArr = arr.reduce((cur, next) => {
        obj[next[key]] ? "" : (obj[next[key]] = true && cur.push(next));
        return cur;
      }, []);
      return returnArr;
    }
    // 普通数组去重
    returnArr = arr.reduce((cur, next) => {
      !cur.includes(next) && cur.push(next);
      return cur;
    }, []);
    return returnArr;
  }

  const handleSubmit = async () => {
    // Alert.alert("删除", "你确定删除吗？", [
    //   { text: "确定" }, //TODO: 触发提交事件
    //   { text: "返回" }, //TODO: 触发取消事件
    // ]);
    let course = {
      name: courseName,
      cover: cover,
      description: description,
      tag: tag,
      teacherName: "刘俊琪",
      price: price,
      courseDetail: arrayUtil(courseDetails, "title"),
    };

    let i = 0;
    for (i = 0; i < course.courseDetail.length; i++) {
      FileSystem.uploadAsync(
        "http://192.168.31.52:3000/api/courses/",
        course.courseDetail[i].uri,
        {
          httpMethod: "PATCH",
        }
      );
    }
    if (i === course.courseDetail.length) {
      coursesApi
        .addCourse(course)
        .then((res) => {
          setCourseName("");
          setTag("");
          setCourseDetails([]);
          setDescription("");
          setPrice();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <AppTextInput
            title='课程名称'
            value={courseName}
            inputStyle={[styles.input, { width: 250, marginRight: 20 }]}
            placeholder='请输入名称'
            onChangeText={(text) => {
              setCourseName(text);
            }}
          />
          <ImageInput image={true} getCoverUri={getCoverUri} />
        </View>
        <View>
          <AppTextInput
            title='价格'
            value={price}
            inputStyle={[styles.input]}
            placeholder='请输入价格'
            onChangeText={(text) => {
              setPrice(text);
            }}
          />
        </View>
        <EditArticleScreen
          courseDescription={true}
          getCourseDescription={getCourseDescription}
          description={description}
        />
        <View style={styles.category}>
          <AppText text='课程分类' />
          <RNPickerSelect
            value={tag}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 20,
                right: 12,
              },
            }}
            onValueChange={(value) => {
              setTag(value);
            }}
            items={[
              { label: "JavaScript", value: "JavaScript" },
              { label: "React", value: "React" },
              { label: "Angular", value: "Angular" },
              { label: "Vue", value: "Vue" },
              { label: "Nodejs", value: "Nodejs" },
              { label: "Java", value: "Java" },
              { label: "PHP", value: "PHP" },
              { label: "Python", value: "Python" },
              { label: "Unity", value: "Unity" },
              { label: "Figma", value: "Figma" },
              { label: "爬虫", value: "爬虫" },
              { label: "其他", value: "others" },
            ]}
            useNativeAndroidPickerStyle={false}
            onOpen={handleOpen}
            onClose={handleClose}
            Icon={() => {
              return <Ionicons name={icon} size={24} color='gray' />;
            }}
          />
        </View>
        {videoNum.map((index) => {
          return (
            <View style={styles.uploadContainer} key={index}>
              <AppTextInput
                inputStyle={styles.input}
                placeholder='请输入小节名称'
                onChangeText={(text) => {
                  obj.title = text;
                }}
              />
              <ImageInput video={true} getVideoUri={getVideoUri} />
            </View>
          );
        })}
        <AppButton
          style={styles.button}
          title='继续添加'
          textStyle={styles.buttonText}
          onPress={handlePress}
        />
        <AppButton
          style={styles.button}
          title='提交'
          textStyle={styles.buttonText}
          onPress={
            courseName && cover && tag && description && courseDetails && price
              ? handleSubmit
              : () => {
                  console.log("请将课程信息填写完整");
                }
          }
        />
        <Toast visibilityTime={5000} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  category: {},
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  uploadContainer: {
    width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    color: colors.lightText,
    letterSpacing: 2,
  },
  editContainer: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: colors.white,
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 30,
    backgroundColor: colors.praimary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: colors.boldText,
  },
  inputAndroid: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    color: colors.boldText,
  },
});
