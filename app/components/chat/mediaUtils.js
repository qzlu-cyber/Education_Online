/*
 * @Author: 刘俊琪
 * @Date: 2022-02-18 16:22:54
 * @LastEditTime: 2022-04-13 18:34:50
 * @Description: 描述
 */
import * as ImagePicker from "expo-image-picker";

export async function pickImageAsync(onSend) {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });
    if (!result.cancelled) {
      onSend([{ image: `data:image/jpeg;base64,${result.base64}` }]);
      return `data:image/jpeg;base64,${result.base64}`;
    }
  } catch (error) {
    console.log("Error reading an image", error);
  }
}

export async function takePictureAsync(onSend) {
  try {
    const getCamera = await ImagePicker.requestCameraPermissionsAsync();
    if (getCamera.status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });

      if (!result.cancelled) {
        onSend([{ image: `data:image/jpeg;base64,${result.base64}` }]);
        return `data:image/jpeg;base64,${result.base64}`;
      }
    }
  } catch (error) {
    console.log("Error reading an image", error);
  }
}
