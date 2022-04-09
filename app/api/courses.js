/*
 * @Author: 刘俊琪
 * @Date: 2022-04-06 17:31:43
 * @LastEditTime: 2022-04-09 15:35:35
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
//分类查找
const searchByTag = (tag) =>
  client.post(`${endpoint}/searchByTag`, {
    tag: tag,
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

export default {
  getCommandCourses,
  getPopularCourses,
  getNewestCourses,
  getOtherCourses,
  searchByTag,
  addCourse,
};
