/*
 * @Author: 刘俊琪
 * @Date: 2022-04-11 11:30:28
 * @LastEditTime: 2022-04-11 12:01:50
 * @Description: 评论
 */
import client from "./client";

const endpoint = "/comments";

const getComments = (id) => client.get(`${endpoint}/:${id}`);

const addComments = (comment) => client.post(endpoint, comment);

export default {
  getComments,
  addComments,
};
