/*
 * @Author: 刘俊琪
 * @Date: 2022-01-21 16:31:16
 * @LastEditTime: 2022-01-21 18:27:28
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

import colors from "../config/colors";

function ImageInput() {
  const [imageUri, setImageUri] = useState();

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
    if (!imageUri) selectImage();
    else
      Alert.alert("删除", "你确定删除这张照片吗？", [
        { text: "确定", onPress: () => setImageUri(null) },
        { text: "返回" },
      ]);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <FontAwesome5 color={colors.boldText} name='camera' size={30} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
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
});

export default ImageInput;
