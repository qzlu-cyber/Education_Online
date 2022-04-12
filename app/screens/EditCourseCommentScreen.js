/*
 * @Author: 刘俊琪
 * @Date: 2022-04-12 10:14:28
 * @LastEditTime: 2022-04-12 11:21:40
 * @Description: 纂写课程评价页面
 */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import { Foundation, Entypo } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import Toast from "react-native-toast-message";

import colors from "../config/colors";

import coursesApi from "../api/courses";
import usersApi from "../api/users";

export default function EditCourseCommentScreen({ route }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState(
    "https://s1.ax1x.com/2020/08/01/a3Pbff.jpg"
  );

  let arr = [false, false, false, false, false];

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "成功",
      text2: "评价成功",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "失败",
      text2: "评价内容不能为空哦",
    });
  };

  const getMyInfo = async () => {
    const result = await usersApi.getMyInfo();
    if (result.ok) setAvatar(`data:image/jpeg;base64,${result.data.avatar}`);
  };

  const handlePress = (index) => {
    setStars(index + 1);
  };

  const handleSubmit = async () => {
    if (comment && stars) {
      const result = await coursesApi.judgeCouse({
        courseId: route.params.courseId,
        stars: stars,
        comment: comment,
        avatar: avatar,
      });

      if (result.ok) {
        showSuccessToast();
        setComment("");
        setStars(0);
      }
    } else {
      showErrorToast();
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.star}>
        {arr.map((star, index) => {
          if (index + 1 <= stars)
            return (
              <TouchableOpacity key={index} onPress={() => handlePress(index)}>
                <Foundation
                  name='star'
                  size={30}
                  color={colors.sign}
                  style={styles.icon}
                />
              </TouchableOpacity>
            );
          else
            return (
              <TouchableOpacity key={index} onPress={() => handlePress(index)}>
                <Foundation
                  name='star'
                  size={30}
                  color={colors.lightText}
                  style={styles.icon}
                />
              </TouchableOpacity>
            );
        })}
      </View>
      <View style={styles.divider} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder='输入评论...'
          onChangeText={(text) => setComment(text)}
          value={comment}
        />
      </View>
      <ActionButton
        buttonColor={colors.praimary}
        offsetY={100}
        renderIcon={() => (
          <Entypo name='paper-plane' size={24} color={colors.white} />
        )}
        onPress={handleSubmit}
      />
      <Toast visibilityTime={3000} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  star: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    width: "100%",
    alignSelf: "center",
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 200,
    borderColor: colors.boldText,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 20,
    padding: 10,
  },
});
