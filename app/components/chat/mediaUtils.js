/*
 * @Author: 刘俊琪
 * @Date: 2022-02-18 16:22:54
 * @LastEditTime: 2022-02-18 18:30:16
 * @Description: 描述
 */
import * as ImagePicker from "expo-image-picker";

export async function pickImageAsync(onSend) {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if (!result.cancelled) {
      onSend([{ image: result.uri }]);
      return result.uri;
    }
  } catch (error) {
    console.log("Error reading an image", error);
  }
}

export async function takePictureAsync(onSend) {
  try {
    const getCamera = await ImagePicker.requestCameraPermissionsAsync();
    console.log(getCamera);
    if (getCamera.status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        onSend([{ image: result.uri }]);
        return result.uri;
      }
    }
  } catch (error) {
    console.log("Error reading an image", error);
  }
}
