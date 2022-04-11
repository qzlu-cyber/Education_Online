/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 13:32:29
 * @LastEditTime: 2022-04-11 07:54:29
 * @Description: 用户相关
 */
import client from "./client";

const endpoint = "/users";

const getUsers = (id) => client.get(`${endpoint}/${id}`);

const getMyInfo = () => client.get(`${endpoint}/me`);

const getCode = (email) => client.post(`${endpoint}/code`, { email: email });

const register = (user) => client.post(endpoint, user);

export default {
  getUsers,
  getMyInfo,
  getCode,
  register,
};
