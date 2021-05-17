import { CURRENT_USER_DETAIL_FAILURE, CURRENT_USER_DETAIL_SUCCESS, LOGIN_FAILURE, LOGIN_SUCCESS, SIGNUP_FAILURE, SIGNUP_SUCCESS } from "../constants/actionTypes";

const INITIAL_STATE = {
  user: null,
  errors: []
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', action.payload.meta.jwt);

      return {
        ...state,
        errors: [],
        user: action.payload.data
      }

    case SIGNUP_SUCCESS:
      localStorage.setItem('accessToken', action.payload.meta.jwt);

      return {
        ...state,
        errors: [],
        user: action.payload.data
      }
    case SIGNUP_FAILURE:
      console.log('errors', action);
      return {
        ...state,
        errors: action.payload.errors
      }
    case CURRENT_USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.data
      }
    case LOGIN_FAILURE, CURRENT_USER_DETAIL_FAILURE:
      return {
        ...state,
        user: null,
        errors: action.payload.errors
      }
    default:
      return state;
  }

}