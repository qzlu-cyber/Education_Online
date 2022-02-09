/*
 * @Author: 刘俊琪
 * @Date: 2022-01-27 17:54:08
 * @LastEditTime: 2022-02-09 15:38:14
 * @Description: 个人信息项
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import AppText from "./AppText";

const windowWidth = Dimensions.get("window").width;

export default function ProfileItem({ text, avatar, data, sign, nickname }) {
  const [imageUri, setImageUri] = useState();
  const [value, onChangeText] = React.useState("");

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("请授予必要的访问权限");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });
      if (!result.cancelled) setImageUri(result.uri);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const handlePress = () => {
    selectImage();
  };
  return (
    <View style={styles.container}>
      <AppText text={text} style={styles.item} />
      {avatar && (
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={
              imageUri ? { uri: imageUri } : require("../assets/avatar.jpg")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
      {data && <AppText text={data} style={styles.text} />}
      {nickname && (
        <TextInput
          placeholder='请输入昵称'
          style={styles.text}
          maxLength={10}
          defaultValue={nickname}
        />
      )}
      {sign && (
        <TextInput
          style={styles.textInput}
          maxLength={15}
          placeholder='这个人很神秘，什么也没留下'
          onChangeText={(text) => onChangeText(text)}
          value={value}
          textAlign='right'
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    width: windowWidth,
    borderBottomWidth: 1,
    borderBottomColor: "#b2bbbe",
    paddingHorizontal: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  item: {
    marginRight: 50,
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});
