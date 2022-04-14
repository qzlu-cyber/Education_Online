/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 14:03:47
 * @LastEditTime: 2022-04-14 14:26:19
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
  Dimensions,
} from "react-native";
import moment from "moment";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { RichEditor } from "react-native-pell-rich-editor";
import AutoHeightWebView from "react-native-autoheight-webview";
import Toast from "react-native-toast-message";
import io from "socket.io-client";

import AppText from "../components/AppText";

import articlesApi from "../api/articles";
import commentsApi from "../api/comments";
import usersApi from "../api/users";
export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      title: "", //文章标题
      html: "", //文章内容
      height: 200,
      showWebView: false,
      likes: this.props.route.params.article.likes,
      isLike: this.props.route.params.like,
      comments: [], //获取到的文章评论
      comment: "", //要发表的评论
      user: {},
      isLikeComment: false,
      commentLike: 0,
      likedComments: this.props.route.params.likedComments,
      me: {},
      socket: {},
    };
  }

  initIO = () => {
    if (!io.socket) {
      this.setState({ socket: io("http://192.168.31.52:3000") });
    }
  };

  getMyInfo = async () => {
    const result = await usersApi.getMyInfo();

    if (result.ok) {
      this.setState({
        me: {
          _id: result.data._id,
          name: result.data.name,
        },
      });
    }
  };

  handleDecode = (str) => {
    const s = str
      .replace(/\\\"/g, '"')
      .replace(/这是空格/g, " ")
      .replace(/这是换行/g, "<br/>");
    return s;
  };

  getArticles = async () => {
    const result = await articlesApi.getArticleById(
      this.props.route.params.article._id
    );

    if (result.ok) {
      this.setState({
        html: result.data.body,
        title: result.data.title,
      });
    }
  };

  getComments = async () => {
    const result = await commentsApi.getComments(
      this.props.route.params.article._id
    );

    if (result.ok) {
      this.setState({
        comments: result.data,
      });
    }
  };

  //给文章点赞
  handlePress = async () => {
    if (!this.state.isLike) {
      this.setState({
        isLike: true,
      });
      this.props.route.params.article.likes++;
      await articlesApi.likeArticle({
        _id: this.props.route.params.article._id,
        likes: this.props.route.params.article.likes,
      });
      this.setState({
        likes: this.state.likes + 1,
      });
    } else {
      this.setState({
        isLike: false,
      });
      this.props.route.params.article.likes--;
      await articlesApi.likeArticle({
        _id: this.props.route.params.article._id,
        likes: this.props.route.params.article.likes,
      });
      this.setState({
        likes: this.state.likes - 1,
      });
    }
  };

  //给评论点赞
  handleLike = async (comment) => {
    // if (!this.state.isLikeComment) {
    //   this.setState({
    //     isLikeComment: true,
    //     commentLike: comment.like,
    //   });

    //   console.log(comment);

    //   const result = await commentsApi.likeComments(comment);
    //   // console.log(result);
    // } else {
    //   this.setState({
    //     isLikeComment: false,
    //     commentLike: comment.like,
    //   });

    //   const result = await commentsApi.likeComments(comment);
    //   console.log(result);
    // }

    this.setState({
      isLikeComment: !this.state.isLikeComment,
    });
  };

  showErrorToast = (msg) => {
    Toast.show({
      type: "error",
      text1: "评论失败",
      text2: msg,
    });
  };

  showSuccessToast = (msg) => {
    Toast.show({
      type: "success",
      text1: "成功",
      text2: msg,
    });
  };

  //给文章评论
  handleSubmit = async () => {
    const comment = {
      comment: this.state.comment, //评论体
      toUser: this.props.route.params.userId, //给谁发的评论
      article: this.props.route.params.article._id, //在哪篇文章下的评论
    };

    if (comment) {
      const result = await commentsApi.addComments(comment);
      if (result.ok) {
        this.setState({
          comment: "",
        });
        this.showSuccessToast("评论成功");
      } else {
        this.showErrorToast(result.data);
      }
    } else {
      this.showErrorToast("评论内容不能为空");
    }
  };

  //楼中楼评论
  handleCicSubmit = async (commentId, toUserId) => {
    let comment = {};
    if (!toUserId) {
      comment = {
        comment: this.state.comment, //评论体
        toUser: this.props.route.params.userId, //给谁发的评论
        article: this.props.route.params.article._id, //在哪篇文章下的评论
        commentId: commentId, //哪一条主楼评论下的评论
      };
    } else {
      comment = {
        comment: this.state.comment, //评论体
        toUser: this.props.route.params.userId, //给谁发的评论
        article: this.props.route.params.article._id, //在哪篇文章下的评论
        commentId: commentId, //哪一条主楼评论下的评论
        toUserId: toUserId, //楼中楼中楼，直接向服务端发过去向哪个用户发送的评论
      };
    }

    if (comment) {
      //评论内容不为空
      const result = await commentsApi.addCicComments(comment);

      if (result.ok) this.showSuccessToast("评论成功");
      else this.showErrorToast(result.data);
    } else {
      this.showErrorToast("评论内容不能为空");
    }
  };

  componentDidMount() {
    this.getMyInfo();
    this.initIO();
    this.getArticles();
    this.getComments();
    setTimeout(() => {
      this.setState({
        showWebView: true,
      });
    }, 1000);
  }

  render() {
    const { article, commentText, avatar, userName, toUser } =
      this.props.route.params;

    const { isLike } = this.state;
    let likeIcon = isLike ? "heart" : "hearto";
    let likeIconColor = isLike ? "#2e64e5" : "#333";
    const navigation = this.props.navigation;

    moment.updateLocale("zh-cn", {
      relativeTime: {
        future: "%s内",
        past: "%s前",
        s: "几秒",
        m: "1 分钟",
        mm: "%d 分钟",
        h: "1 小时",
        hh: "%d 小时",
        d: "1 天",
        dd: "%d 天",
        M: "1 个月",
        MM: "%d 个月",
        y: "1 年",
        yy: "%d 年",
      },
    });

    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ backgroundColor: "#fff", paddingHorizontal: 10 }}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() =>
                  navigation.navigate("聊天", {
                    userName: article.userName,
                    item: toUser,
                    user: this.state.me,
                    socket: this.state.socket,
                  })
                }>
                <Image source={{ uri: avatar }} style={styles.userImg} />
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{userName}</Text>
                  <Text style={styles.postTime}>
                    {moment(article.postTime).fromNow()}
                  </Text>
                </View>
              </TouchableOpacity>
              <AppText text={this.state.title} style={styles.postTitle} />
              {Platform.OS === "ios" && (
                <AutoHeightWebView
                  ref={(ref) => {
                    this.webview = ref;
                  }}
                  style={{
                    width: Dimensions.get("window").width - 20,
                    marginTop: 10,
                  }}
                  source={{ html: `${this.state.html}` }}
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
              {Platform.OS === "android" && this.state.showWebView && (
                <AutoHeightWebView
                  ref={(ref) => {
                    this.webview = ref;
                  }}
                  style={{
                    width: Dimensions.get("window").width - 20,
                    marginTop: 35,
                  }}
                  source={{ html: `${this.state.html}` }}
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
                  onPress={this.handlePress}>
                  <AntDesign name={likeIcon} size={20} color={likeIconColor} />
                  <Text active={article.liked} style={styles.interactionText}>
                    {this.state.likes === 0 ? "赞" : this.state.likes + "个赞"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          data={this.state.comments}
          renderItem={({ item }) => {
            // //TODO: 点赞评论
            const comentId = item.comment._id;
            // let liked = false;
            // let likeCommentIcon = "hearto";
            // let likeCommentIconColor = "#333";
            // // if (this.state.likedComments.indexOf(comentId) > -1) {
            // //   console.log("liked");
            // // } else {
            // //   console.log("unlike");
            // // }
            // const handleLike = async (comment) => {
            //   console.log(comment);

            //   if (comment.liked) {
            //     item.comment.likes -= 1;
            //     liked = false;
            //     likeCommentIcon = "hearto";
            //     likeCommentIconColor = "#333";
            //   } else {
            //     item.comment.likes += 1;
            //     liked = true;
            //     likeCommentIcon = "heart";
            //     likeCommentIconColor = "#2e64e5";
            //   }

            //   console.log(liked, likeCommentIcon, likeCommentIconColor);
            // };
            return (
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
                              userName: item.userInfo.name,
                              item: item.userInfo,
                              user: this.state.me,
                              socket: this.state.socket,
                            })
                          }>
                          <Image
                            source={{
                              uri:
                                item.userInfo.avatar.length > 100
                                  ? `data:image/jpeg;base64,${item.userInfo.avatar}`
                                  : item.userInfo.avatar,
                            }}
                            style={styles.commentUserImg}
                          />
                          <View style={styles.userInfoText}>
                            <Text style={styles.userName}>
                              {item.userInfo.name}
                            </Text>
                            <Text style={styles.postTime}>
                              {moment(item.comment.postTime).fromNow()}
                            </Text>
                          </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                          style={styles.interaction}
                          // onPress={() => {
                          //   this.state.isLikeComment
                          //     ? handleLike({
                          //         _id: item.comment._id,
                          //         likes: item.comment.likes - 1,
                          //         liked: true, //已点过赞
                          //       })
                          //     : handleLike({
                          //         _id: item.comment._id,
                          //         likes: item.comment.likes + 1,
                          //         liked: false, //未点过赞
                          //       });
                          // }}
                          >
                          <AntDesign
                            name={likeCommentIcon}
                            size={20}
                            color={likeCommentIconColor}
                          />
                          <Text style={styles.interactionText}>
                            {item.comment.likes === 0
                              ? "赞"
                              : item.comment.likes + "个赞"}
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                      <TouchableOpacity
                        style={styles.comment}
                        onPress={() => this.handleCicSubmit(item.comment._id)}>
                        <Text style={styles.commentText}>
                          {item.comment.comment}
                        </Text>
                      </TouchableOpacity>
                    </>
                  }
                  data={item.comment.comments}
                  renderItem={({ item }) => (
                    <View style={styles.comments}>
                      <View style={styles.commentsContainer}>
                        <TouchableOpacity
                          style={styles.commentsUserInfo}
                          onPress={() =>
                            navigation.navigate("聊天", {
                              userName: item.author.name,
                              item: item.author,
                              user: this.state.me,
                              socket: this.state.socket,
                            })
                          }>
                          <Text style={styles.userName}>
                            {item.author.name}
                          </Text>
                        </TouchableOpacity>
                        <Text>回复</Text>
                        <TouchableOpacity
                          style={styles.commentsUserInfo}
                          onPress={() =>
                            navigation.navigate("聊天", {
                              userName: item.toUser.name,
                              item: item.toUser,
                              user: this.state.me,
                              socket: this.state.socket,
                            })
                          }>
                          <Text style={styles.userName}>
                            {item.toUser.name}
                          </Text>
                        </TouchableOpacity>
                        <Text>：</Text>
                        <TouchableOpacity
                          style={styles.commentsUserInfo}
                          onPress={() =>
                            this.handleCicSubmit(comentId, item.toUserId)
                          }>
                          <Text style={styles.commentsText}>
                            {item.comment}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  keyExtractor={(comment) => comment._id}
                />
              </View>
            );
          }}
          keyExtractor={(comment) => comment.comment._id}
        />
        <View style={styles.submitContainer}>
          <ScrollView style={styles.inputView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}>
              <RichEditor
                onChange={(comment) => {
                  this.setState({
                    comment: comment,
                  });
                }}
              />
            </KeyboardAvoidingView>
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Entypo name='paper-plane' size={24} color='#fff' />
          </TouchableOpacity>
        </View>
        <Toast visibilityTime={3000} />
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
