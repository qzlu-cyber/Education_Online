/*
 * @Author: 刘俊琪
 * @Date: 2022-04-10 16:47:36
 * @LastEditTime: 2022-04-10 16:48:44
 * @Description: 登录
 */
import client from "./client";

const endpoint = "/auth";

const login = (email, password) => client.post(endpoint, { email, password });

export default {
  login,
};
