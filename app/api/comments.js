/*
 * @Author: 刘俊琪
 * @Date: 2022-04-11 11:30:28
 * @LastEditTime: 2022-04-11 19:19:36
 * @Description: 评论
 */
import client from "./client";

const endpoint = "/comments";

const getComments = (id) => client.get(`${endpoint}/${id}`);

const addComments = (comment) => client.post(endpoint, comment);

const addCicComments = (comment) => client.post(`${endpoint}/cic`, comment);

const likeComments = async (comment) => {
  return client.put(`${endpoint}/${comment._id}`, { likes: comment.likes });
};

export default {
  getComments,
  addComments,
  addCicComments,
  likeComments,
};
