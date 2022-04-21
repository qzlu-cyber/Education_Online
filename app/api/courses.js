/*
 * @Author: 刘俊琪
 * @Date: 2022-04-06 17:31:43
 * @LastEditTime: 2022-04-21 18:47:33
 * @Description: 请求课程
 */
import client from "./client";

const endpoint = "/courses";

const getCourseTeacher = (id) => client.get(`${endpoint}/${id}`);

const getPopularCourses = () => client.get(`${endpoint}/searchByHot`);

const getNewestCourses = () => client.get(`${endpoint}/searchByDate`);

//推荐课程
const getCommandCourses = () => client.get(endpoint);
//其他课程
const getOtherCourses = () => client.get(`${endpoint}/otherCourses`);
//分类查找
const searchByTag = (tag) =>
  client.post(`${endpoint}/searchByTag`, {
    tag: tag,
  });
//按老师查找
const searchByTeacher = (id) => client.get(`${endpoint}/searchByTeacher/${id}`);

//搜索
const search = (name) =>
  client.post(`${endpoint}/searchByName`, {
    name: name,
  });

const addCourse = async (course) => {
  const data = {};
  data.name = course.name;
  data.description = course.description;
  data.tags = course.tag;
  data.teacher = "624d5f825c5e1906920afbfb";
  data.teacherName = course.teacherName;
  data.price = course.price;
  data.courseDetail = course.courseDetail;
  data.cover = course.cover;

  return client.post(endpoint, data);
};

//评价课程
const judgeCouse = (commentInfo) =>
  client.post(`${endpoint}/judge`, commentInfo);

//获取评价
const getJudge = (id) => client.get(`${endpoint}/judge/${id}`);

export default {
  getCourseTeacher,
  getCommandCourses,
  getPopularCourses,
  getNewestCourses,
  getOtherCourses,
  searchByTag,
  addCourse,
  judgeCouse,
  getJudge,
  searchByTeacher,
  search,
};
