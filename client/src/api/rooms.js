import ajax from "./ajax";

export function getConversationList() {
  return ajax('/chat_rooms');
}