import { createAction } from 'redux-actions';
import { getConversationList } from '../api/rooms';
import { CONVERSATION_LIST_FAILURE, CONVERSATION_LIST_SUCCESS } from '../constants/actionTypes';

const conversationListSuccess = createAction(CONVERSATION_LIST_SUCCESS);
const conversationListFailure = createAction(CONVERSATION_LIST_FAILURE);

export function getConversations() {
  return dispatch => getConversationList()
  .then(data => {
    dispatch(conversationListSuccess(data));
  }).catch(error => {
    dispatch(conversationListFailure(error));
  })
}