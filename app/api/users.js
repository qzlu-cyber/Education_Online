/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 13:32:29
 * @LastEditTime: 2022-04-08 13:58:48
 * @Description: 用户相关
 */
import client from "./client";

const endpoint = "/users";

const getUsers = (id) => client.get(`${endpoint}/${id}`);

export default {
  getUsers,
};
