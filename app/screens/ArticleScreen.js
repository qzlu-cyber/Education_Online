/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 14:03:47
 * @LastEditTime: 2022-04-06 19:22:10
 * @Description: 动态详情页
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from "react-native";
import moment from "moment";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { RichEditor } from "react-native-pell-rich-editor";
import AutoHeightWebView from "react-native-autoheight-webview";

import { commentsData } from "../config/db";
export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
    };
  }
  render() {
    const { article, likeText, likeIcon, likeIconColor, commentText } =
      this.props.route.params;
    const navigation = this.props.navigation;
    const imageList = [
      "https://img.lesmao.vip/k/h256/R/MeiTu/1293.jpg",
      "https://img.lesmao.vip/k/h256/R/MeiTu/1297.jpg",
      "https://img.lesmao.vip/k/h256/R/MeiTu/1292.jpg",
    ];
    const initHTML = `<br/>
<center><b onclick="_.sendEvent('TitleClick')" id="title" contenteditable="false">Rich Editor</b></center>
<center>
<a href="https://github.com/wxik/react-native-rich-editor">React Native</a>
<span>And</span>
<a href="https://github.com/wxik/flutter-rich-editor">Flutter</a>
</center>
<br/>
<div><center><img src="${imageList[0]}" onclick="_.sendEvent('ImgClick')" contenteditable="false" height="170px"/></center></div>
<pre type="javascript"><code>const editor = ReactNative;</code>
<code>console.log(editor);</code>
</pre>
`;
    const html = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"></head><body>${initHTML}</body></html>`;

    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 10 }}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() =>
                  navigation.navigate("聊天", { userName: article.userName })
                }>
                {/*TODO:点击跳转聊天*/}
                <Image source={article.userImg} style={styles.userImg} />
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{article.userName}</Text>
                  <Text style={styles.postTime}>
                    {moment(article.postTime, "YYYY-MMDD HH:mm").fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>
              {Platform.OS === "ios" && (
                <AutoHeightWebView
                  ref={(ref) => {
                    this.webview = ref;
                  }}
                  source={{ html }}
                  onNavigationStateChange={(event) => {
                    if (event.url) {
                      this.setState({ link: event.url });
                      this.webview.stopLoading();
                      if (event.url !== "about:blank") {
                        Linking.openURL(event.url).catch((err) =>
                          console.error(err)
                        );
                      }
                    }
                  }}
                />
              )}
              {Platform.OS === "android" && (
                <AutoHeightWebView
                  ref={(ref) => {
                    this.webview = ref;
                  }}
                  source={{ html }}
                  onLoadStart={() => {
                    Platform.select({
                      android: () => this.webview.goBack(),
                    })();
                  }}
                  onShouldStartLoadWithRequest={(event) => {
                    if (event.url === "about:blank") return false;
                    else {
                      Linking.openURL(event.url).catch((err) =>
                        console.error(err)
                      );
                      return true;
                    }
                  }}
                />
              )}
              <View style={styles.likeComment}>
                <TouchableOpacity style={styles.interaction}>
                  <Ionicons name='md-chatbubble-outline' size={20} />
                  <Text style={styles.interactionText}>{commentText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.interaction}
                  active={article.liked}>
                  <AntDesign name={likeIcon} size={20} color={likeIconColor} />
                  <Text active={article.liked} style={styles.interactionText}>
                    {likeText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          data={commentsData}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <>
                    <View style={styles.infoContainer}>
                      <TouchableOpacity
                        style={styles.userInfo}
                        onPress={() =>
                          navigation.navigate("聊天", {
                            userName: item.userName,
                          })
                        }>
                        <Image
                          source={item.userImg}
                          style={styles.commentUserImg}
                        />
                        <View style={styles.userInfoText}>
                          <Text style={styles.userName}>{item.userName}</Text>
                          <Text style={styles.postTime}>
                            {moment(item.postTime, "YYYY-MMDD HH:mm").fromNow()}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.interaction}
                        active={item.liked}>
                        <AntDesign
                          name={likeIcon}
                          size={20}
                          color={likeIconColor}
                        />
                        <Text
                          active={item.liked}
                          style={styles.interactionText}>
                          {likeText}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.comment}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                    </TouchableOpacity>
                  </>
                }
                data={item.comments}
                renderItem={({ item }) => (
                  <View style={styles.comments}>
                    <View style={styles.commentsContainer}>
                      <TouchableOpacity
                        style={styles.commentsUserInfo}
                        onPress={() =>
                          navigation.navigate("聊天", {
                            userName: item.fromUserName,
                          })
                        }>
                        <Text style={styles.userName}>{item.fromUserName}</Text>
                      </TouchableOpacity>
                      <Text>回复</Text>
                      <TouchableOpacity
                        style={styles.commentsUserInfo}
                        onPress={() =>
                          navigation.navigate("聊天", {
                            userName: item.toUserName,
                          })
                        }>
                        <Text style={styles.userName}>{item.toUserName}</Text>
                      </TouchableOpacity>
                      <Text>：</Text>
                      <TouchableOpacity style={styles.commentsUserInfo}>
                        <Text style={styles.commentsText}>{item.comment}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(comment) => comment.id}
              />
            </View>
          )}
          keyExtractor={(comment) => comment.id.toString()}
        />
        <View style={styles.submitContainer}>
          <ScrollView style={styles.inputView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}>
              <RichEditor
                onChange={(descriptionText) => {
                  console.log("descriptionText:", descriptionText);
                }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
          <TouchableOpacity style={styles.button}>
            <Entypo name='paper-plane' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    paddingLeft: 0,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 20,
    paddingRight: 15,
    marginBottom: 10,
  },
  postText: {
    fontSize: 18,
    paddingRight: 15,
    marginBottom: 15,
  },
  postImg: {
    width: "100%",
    height: 250,
  },
  interaction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 5,
    paddingVertical: 2,
    marginVertical: 20,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
  },
  likeComment: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentContainer: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  comment: {
    paddingHorizontal: 50,
    marginTop: -10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
  },
  commentUserImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  //楼中楼评论
  comments: {
    marginLeft: 50,
    paddingHorizontal: 5,
    backgroundColor: "#F5F5F5",
    paddingVertical: 5,
  },
  commentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  commentsUserInfo: {
    paddingHorizontal: 2,
  },
  commentsText: {
    marginVertical: 2,
  },
  submitContainer: {
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  inputView: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 3,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#265AE8",
    borderRadius: 17,
    padding: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
