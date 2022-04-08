/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 10:28:59
 * @LastEditTime: 2022-04-08 10:30:52
 * @Description: 动态文章相关
 */
import client from "./client";

const endpoint = "/articles";

const getArticles = () => client.get(endpoint);

export default {
  getArticles,
};
