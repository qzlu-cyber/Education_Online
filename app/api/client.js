/*
 * @Author: 刘俊琪
 * @Date: 2022-04-06 17:28:57
 * @LastEditTime: 2022-04-06 17:31:31
 * @Description: 描述
 */
import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.31.52:3000/api",
});

export default apiClient;
