import * as ProfileRequests from '../api/auth';
import { createAction } from 'redux-actions';
import {
  CURRENT_USER_DETAIL_FAILURE,
  CURRENT_USER_DETAIL_SUCCESS,
  LOGIN_FAILURE, LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS
} from '../constants/actionTypes';

const loginSuccess = createAction(LOGIN_SUCCESS);
const loginFailure = createAction(LOGIN_FAILURE);

export function login(payload) {
  return dispatch => ProfileRequests.login(payload)
    .then(({ data }) => dispatch(loginSuccess(data)))
    .catch(error => dispatch(loginFailure(error)));
}

const signupSuccess = createAction(SIGNUP_SUCCESS);
const signupFailure = createAction(SIGNUP_FAILURE);

export function signup(params) {
  return dispatch => ProfileRequests.signup(params)
    .then(({ data }) => dispatch(signupSuccess(data)))
    .catch(error => dispatch(signupFailure(error.response.data)));
}

const currentUserDetailSuccess = createAction(CURRENT_USER_DETAIL_SUCCESS);
const currentUserDetailFailure = createAction(CURRENT_USER_DETAIL_FAILURE);

export function getCurrentUser() {
  return dispatch => ProfileRequests.getUserDetails()
    .then(({ data }) => {
      dispatch(currentUserDetailSuccess(data))
      return true;
    })
    .catch((error) => {
      dispatch(currentUserDetailFailure(error?.response?.data))
      return false;
    });
}
