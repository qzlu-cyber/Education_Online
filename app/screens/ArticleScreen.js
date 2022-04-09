/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 14:03:47
 * @LastEditTime: 2022-04-09 09:59:05
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
import { WebView } from "react-native-webview";

import { commentsData } from "../config/db";

import articlesApi from "../api/articles";
export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      html: "",
      like: false,
      height: 200,
    };
  }

  handleDecode = (str) => {
    const s = str
      .replace(/\\\"/g, '"')
      .replace(/这是空格/g, " ")
      .replace(/这是换行/g, "<br/>");
    return s;
  };

  getArticles = async () => {
    const result = await articlesApi.getArticles();

    // console.log(result.data[0].body);
    if (result.ok) {
      this.setState({
        html: this.handleDecode(result.data[3].body),
      });
    }
  };

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { article, likeText, commentText, avatar, userName } =
      this.props.route.params;
    const handlePress = () => {
      if (!this.state.like) {
        this.setState({ like: true });
        article.likes++;
      } else {
        this.setState({ like: false });
        article.likes--;
      }
    };

    let likeIcon = this.state.like ? "heart" : "hearto";
    let likeIconColor = this.state.like ? "#2e64e5" : "#333";
    const { html } = this.state;
    const navigation = this.props.navigation;

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
                <Image source={{ uri: avatar }} style={styles.userImg} />
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{userName}</Text>
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
              {/* {Platform.OS === "android" && (
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
              )} */}
              <View style={styles.likeComment}>
                <TouchableOpacity style={styles.interaction}>
                  <Ionicons name='md-chatbubble-outline' size={20} />
                  <Text style={styles.interactionText}>{commentText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.interaction}
                  active={this.state.like}
                  onPress={handlePress}>
                  <AntDesign name={likeIcon} size={20} color={likeIconColor} />
                  <Text active={article.liked} style={styles.interactionText}>
                    {article.likes === 0 ? "赞" : article.likes + "个赞"}
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
                        <AntDesign name='hearto' size={20} color='#333' />
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
