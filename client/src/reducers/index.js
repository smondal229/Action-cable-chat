import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import rooms from './rooms';

const reducers = combineReducers({
  profile: user,
  users,
  rooms
});

export default reducers;