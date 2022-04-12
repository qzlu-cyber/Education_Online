/*
 * @Author: 刘俊琪
 * @Date: 2022-04-08 13:32:29
 * @LastEditTime: 2022-04-12 14:58:53
 * @Description: 用户相关
 */
import client from "./client";

const endpoint = "/users";

const getUsers = (id) => client.get(`${endpoint}/${id}`);

const getMyInfo = () => client.get(`${endpoint}/me`);

const getCode = (email) => client.post(`${endpoint}/code`, { email: email });

const register = (user) => client.post(endpoint, user);

const shopping = (courseId) =>
  client.post(`${endpoint}/shopping`, {
    courseId: courseId,
  });

const getMyCourses = () => client.get(`${endpoint}/mycourses`);

const getTeachers = () => client.get(`${endpoint}/teachers`);

export default {
  getUsers,
  getMyInfo,
  getCode,
  register,
  shopping,
  getTeachers,
  getMyCourses,
};
