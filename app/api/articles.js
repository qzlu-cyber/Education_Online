/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 10:28:59
 * @LastEditTime: 2022-04-09 18:07:45
 * @Description: 动态文章相关
 */
import client from "./client";

const endpoint = "/articles";

const getArticles = () => client.get(endpoint);

const addArticles = async (article) => {
  return client.post(endpoint, article);
};

const likeArticle = async (article) => {
  console.log(article);
  return client.put(`${endpoint}/${article._id}`, { likes: article.likes });
};

export default {
  getArticles,
  addArticles,
  likeArticle,
};
