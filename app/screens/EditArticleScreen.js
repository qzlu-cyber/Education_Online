/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 15:34:31
 * @LastEditTime: 2022-02-14 18:21:28
 * @Description: 发布帖子页
 */
import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { XMath } from "@wxik/core";
import * as ImagePicker from "expo-image-picker";

import { InsertLinkModal } from "../components/InsertLink";

export default function EditArticleScreen() {
  let richText = useRef();
  let linkModal = useRef();
  let scrollRef = useRef();
  // save on html
  let contentRef = useRef();

  // editor change data
  let handleChange = useCallback((html) => {
    // save html to content ref;
    contentRef.current = html;
  }, []);

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
        base64: true,
      });
      if (!result.cancelled) {
        setImageUri(result.base64);
        console.log(result.uri);
        // richText.current?.insertImage(imageUri);
        richText.current?.insertImage(
          `data:image/jpeg;base64,${result.base64}`
        );
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  let onPressAddImage = useCallback(() => {
    selectImage();
    // insert URL

    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);

  let onInsertLink = useCallback(() => {
    // this.richText.current?.insertLink('Google', 'http://google.com');
    linkModal.current?.setModalVisible(true);
  }, []);

  let onLinkDone = useCallback(({ title, url }) => {
    richText.current?.insertLink(title, url);
  }, []);

  let handleFontSize = useCallback(() => {
    // 1=  10px, 2 = 13px, 3 = 16px, 4 = 18px, 5 = 24px, 6 = 32px, 7 = 48px;
    let size = [1, 2, 3, 4, 5, 6, 7];
    richText.current?.setFontSize(size[XMath.random(size.length - 1)]);
  }, []);

  let handleForeColor = useCallback(() => {
    richText.current?.setForeColor("blue");
  }, []);

  let handleHiliteColor = useCallback(() => {
    richText.current?.setHiliteColor("red");
  }, []);

  let handleCursorPosition = useCallback((scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <InsertLinkModal onDone={onLinkDone} ref={linkModal} />
      <ScrollView
        style={[styles.scroll]}
        keyboardDismissMode={"none"}
        ref={scrollRef}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}>
        <RichEditor
          initialFocus={true}
          style={styles.richTitle}
          useContainer={true}
          initialHeight={50}
          placeholder={"请输入标题..."}
          pasteAsPlainText={true}
        />
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#bfbfbf"}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
        />
        <RichEditor
          ref={richText}
          style={styles.richTitle}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={"done"}
          placeholder={"请输入正文..."}
          onChange={handleChange}
          onCursorPosition={handleCursorPosition}
          pasteAsPlainText={true}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <RichToolbar
          style={[styles.richBar]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          // iconTint={color}
          selectedIconTint={"#2095F2"}
          disabledIconTint={"#bfbfbf"}
          onPressAddImage={onPressAddImage}
          onInsertLink={onInsertLink}
          // iconSize={24}
          // iconGap={10}
          actions={[
            actions.undo,
            actions.redo,
            actions.insertImage,
            actions.setStrikethrough,
            // actions.checkboxList,
            actions.insertOrderedList,
            actions.blockquote,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.code,
            actions.line,

            actions.foreColor,
            actions.hiliteColor,
            actions.heading1,
            actions.heading4,
            "fontSize",
          ]} // default defaultActions
          iconMap={{
            [actions.foreColor]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: "blue" }]}>FC</Text>
            ),
            [actions.hiliteColor]: ({ tintColor }) => (
              <Text
                style={[
                  styles.tib,
                  { color: tintColor, backgroundColor: "red" },
                ]}>
                BC
              </Text>
            ),
            [actions.heading1]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H1</Text>
            ),
            [actions.heading4]: ({ tintColor }) => (
              <Text style={[styles.tib, { color: tintColor }]}>H4</Text>
            ),
          }}
          fontSize={handleFontSize}
          foreColor={handleForeColor}
          hiliteColor={handleHiliteColor}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  richTitle: {
    height: 50,
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e3e3e3",
  },
  topVi: {
    backgroundColor: "#fafafa",
  },
  richBar: {
    borderColor: "#efefef",
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: "#191d20",
    borderColor: "#696969",
  },
  scroll: {
    backgroundColor: "#ffffff",
  },
  scrollDark: {
    backgroundColor: "#2e3847",
  },
  darkBack: {
    backgroundColor: "#191d20",
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e8e8e8",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
  },

  tib: {
    textAlign: "center",
    color: "#515156",
  },

  flatStyle: {
    paddingHorizontal: 12,
  },
});
