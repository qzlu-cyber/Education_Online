/*
 * @Author: 刘俊琪
 * @Date: 2022-04-06 17:31:43
 * @LastEditTime: 2022-04-06 18:31:44
 * @Description: 请求课程
 */
import client from "./client";

const endpoint = "/courses";

const getPopularCourses = () => client.get(`${endpoint}/searchByHot`);

const getNewestCourses = () => client.get(`${endpoint}/searchByDate`);

//推荐课程
const getCommandCourses = () => client.get(endpoint);
//其他课程
const getOtherCourses = () => client.get(`${endpoint}/otherCourses`);

export default {
  getCommandCourses,
  getPopularCourses,
  getNewestCourses,
  getOtherCourses,
};
