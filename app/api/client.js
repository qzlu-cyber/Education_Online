/*
 * @Author: 刘俊琪
 * @Date: 2022-04-06 17:28:57
 * @LastEditTime: 2022-04-10 14:23:25
 * @Description: 描述
 */
import { create } from "apisauce";
import cache from "../utility/cache";

const apiClient = create({
  baseURL: "http://192.168.31.52:3000/api",
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data
    ? {
        ok: true,
        data,
      }
    : response;
};

export default apiClient;
