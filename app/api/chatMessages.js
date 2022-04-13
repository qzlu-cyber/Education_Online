/*
 * @Author: 刘俊琪
 * @Date: 2022-04-13 14:46:57
 * @LastEditTime: 2022-04-13 16:26:04
 * @Description: 描述
 */
import client from "./client";

const getMessagesList = () => client.get("/chatMessages");

const readMessage = (to) =>
  client.post("/chatMessages/readMessage", {
    to,
  });

const deleteMessages = (id) =>
  client.delete(`/chatMessages/deleteMessages${id}`);

export default {
  getMessagesList,
  readMessage,
  deleteMessages,
};
