/*
 * @Author: 刘俊琪
 * @Date: 2022-02-13 10:43:36
 * @LastEditTime: 2022-04-21 19:34:00
 * @Description: 动态 组件
 */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import io from "socket.io-client";

import ProgressiveImage from "./ProgressiveImage";

import useAuth from "../auth/useAuth";
import usersApi from "../api/users";
import articlesApi from "../api/articles";
import useApi from "../hooks/useApi";

const PostCard = ({ item, navigation }) => {
  const { user } = useAuth();

  const [like, setLike] = useState(false);
  const [likedComments, setLikedComments] = useState([]);
  const [socket, setSocket] = useState({});

  const initIO = () => {
    if (!io.socket) {
      setSocket(io("http://192.168.31.52:3000"));
    }
  };

  const getMyInfo = async () => {
    const result = await usersApi.getMyInfo();
    if (result.ok) {
      setLike(result.data.likedArticles.indexOf(item._id) > -1 ? true : false);
      setLikedComments(result.data.likedComments);
    }
  };

  const handlePress = async () => {
    setLike(!like);
    if (!like) {
      item.liked = true;
      item.likes++;
      await articlesApi.likeArticle({
        _id: item._id,
        likes: item.likes,
      });
    } else {
      item.liked = false;
      item.likes--;
      await articlesApi.likeArticle({
        _id: item._id,
        likes: item.likes,
      });
    }
  };

  let likeText;
  let likeIcon = like ? "heart" : "hearto";
  let likeIconColor = like ? "#2e64e5" : "#333";
  let commentText;

  if (item.likes == 1) {
    likeText = "1 个赞";
  } else if (item.likes > 1) {
    likeText = item.likes + " 个赞";
  } else {
    likeText = "赞";
  }

  if (item.comments == 1) {
    commentText = "1 条评论";
  } else if (item.comments.length > 1) {
    commentText = item.comments.length + " 条评论";
  } else {
    commentText = "评论";
  }

  const getUsers = useApi(usersApi.getUsers);

  useEffect(() => {
    getUsers.request(item.author);

    getMyInfo();

    initIO();
  }, []);

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
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() =>
        navigation.navigate("动态详情", {
          article: item,
          like,
          likeText,
          likeIcon,
          likeIconColor,
          commentText,
          avatar: `data:image/jpeg;base64,${getUsers.data.avatar}`,
          userName: getUsers.data.name,
          userId: getUsers.data._id,
          likedComments,
          toUser: getUsers.data,
        })
      }>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() =>
          navigation.navigate("聊天", {
            userName: getUsers.data.name,
            item: { _id: getUsers.data._id, name: getUsers.data.name },
            user,
            socket,
          })
        }>
        <Image
          source={{
            uri: `data:image/jpeg;base64,${getUsers.data.avatar}`,
          }}
          style={styles.userImg}
        />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{getUsers.data.name}</Text>
          <Text style={styles.postTime}>{moment(item.postTime).fromNow()}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postText}>
        {item.body.replace(/<[^>]*>|/g, "").substring(0, 51)}
      </Text>
      {item.postImg != false && item.postImg ? (
        <ProgressiveImage
          source={item.postImg}
          style={{ width: "100%", height: 150 }}
          resizeMode='cover'
        />
      ) : (
        <View style={styles.divider} />
      )}

      <View style={styles.interactionWrapper}>
        <TouchableOpacity
          style={styles.interaction}
          onPress={handlePress}
          active={item.liked}>
          <AntDesign name={likeIcon} size={20} color={likeIconColor} />
          <Text active={item.liked} style={styles.interactionText}>
            {likeText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interaction}>
          <Ionicons name='md-chatbubble-outline' size={20} />
          <Text style={styles.interactionText}>{commentText}</Text>
        </TouchableOpacity>
        {/* <Interaction onPress={() => {}}>
          <Ionicons name='md-trashBin' size={25} />
        </Interaction> */}
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
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
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  postText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
  },
  postImg: {
    width: "100%",
    height: 250,
  },
  divider: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
  },
});
