import { CONVERSATION_LIST_FAILURE, CONVERSATION_LIST_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  list: [],
  errors: null
}
export default function Rooms(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CONVERSATION_LIST_SUCCESS:
      return {
        ...state,
        errors: null,
        list: action.payload.data
      }
    case CONVERSATION_LIST_FAILURE:
      return {
        ...state,
        errors: action.payload.errors
      }
    default:
      return state;
  }
}
