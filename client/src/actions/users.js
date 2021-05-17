import { createAction } from 'redux-actions';
import { fetchUsers } from '../api/users';
import { USERS_LIST_FAILURE, USERS_LIST_SUCCESS } from '../constants/actionTypes';

const getUserListSuccess = createAction(USERS_LIST_SUCCESS);
const getUserListFailure = createAction(USERS_LIST_FAILURE);

export function getUsersList(page, search) {
  return dispatch => fetchUsers(page, search)
  .then(({ data }) => dispatch(getUserListSuccess(data)))
  .catch(error => dispatch(getUserListFailure(error.response.data)));
}
