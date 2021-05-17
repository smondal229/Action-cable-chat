import { USERS_LIST_FAILURE, USERS_LIST_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  list: [],
  error: null,
  page: 0,
  count: 5
}

export default function users(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USERS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        list: [...state.list, ...action.payload.data],
        page: parseInt(action.payload.meta.page),
        count: parseInt(action.payload.meta.total)
      }
    case USERS_LIST_FAILURE:
      return {
        ...state,
        error: action.payload.errors
      }
    default:
      return state;
  }
}