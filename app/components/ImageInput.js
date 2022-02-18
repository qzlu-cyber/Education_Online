/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 16:31:16
 * @LastEditTime: 2022-02-18 15:15:56
 * @Description: 选取头像，图片等
 */
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import Toast from "react-native-toast-message";

import colors from "../config/colors";
import AppText from "./AppText";

function ImageInput({ image, video }) {
  const [imageUri, setImageUri] = useState();
  const [videoUri, setVideoUri] = useState();

  useEffect(() => {
    requestPermission();
  }, []);

  // useEffect(() => {
  //   showToast();
  // }, [imageUri, videoUri]);

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
      if (!result.cancelled) {
        setImageUri(result.uri);
        showToast();
      }
      console.log(result);
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  const selectVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      });
      if (!result.cancelled) {
        setVideoUri(result.uri);
        showToast();
      }
    } catch (error) {
      console.log("Error reading an video", error);
    }
  };

  const showToast = () => {
    Toast.show({
      type: "info",
      text1: "提示",
      text2: "长按可以删除已经上传的图片或视频哦 👋",
    });
  };

  const handlePress = () => {
    if (image) {
      if (!imageUri) {
        selectImage();
      }
    }
    if (video) {
      if (!videoUri) {
        selectVideo();
      }
    }
  };

  const handleLongPress = () => {
    if (image) {
      if (!imageUri) selectImage();
      else
        Alert.alert("删除", "你确定删除吗？", [
          { text: "确定", onPress: () => setImageUri(null) },
          { text: "返回" },
        ]);
    }
    if (video) {
      if (!videoUri) selectVideo();
      else
        Alert.alert("删除", "你确定删除吗？", [
          { text: "确定", onPress: () => setVideoUri(null) },
          { text: "返回" },
        ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      onLongPress={handleLongPress}>
      <View style={image ? styles.container : styles.uploadContainer}>
        {image && (
          <View style={styles.container}>
            {!imageUri && (
              <FontAwesome5 color={colors.boldText} name='camera' size={30} />
            )}
            {imageUri && (
              <Image source={{ uri: imageUri }} style={styles.image} />
            )}
          </View>
        )}
        {video && (
          <View style={styles.uploadContainer}>
            {!videoUri && (
              <View style={styles.upload}>
                <FontAwesome5 name='plus-circle' size={50} color='black' />
                <AppText text='上传视频' style={styles.text} />
              </View>
            )}
            {videoUri && (
              <Video
                source={{ uri: videoUri }}
                rate={1.0}
                isMuted={false}
                resizeMode='cover'
                shouldPlay={false}
                isLooping={false}
                useNativeControls
                style={styles.uploadContainer}
              />
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e2e1e4",
    borderRadius: 10,
    height: 80,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 80,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  //video begin
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  uploadContainer: {
    backgroundColor: colors.gray,
    width: "100%",
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  upload: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginTop: 10,
    color: colors.lightText,
    letterSpacing: 2,
  },
  //video end
});

export default ImageInput;
