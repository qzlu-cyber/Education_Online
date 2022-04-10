/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 13:32:29
 * @LastEditTime: 2022-04-10 15:34:48
 * @Description: 用户相关
 */
import client from "./client";

const endpoint = "/users";

const getUsers = (id) => client.get(`${endpoint}/${id}`);

const getCode = (email) => client.post(`${endpoint}/code`, { email: email });

const register = (user) => client.post(endpoint, user);

export default {
  getUsers,
  getCode,
  register,
};
