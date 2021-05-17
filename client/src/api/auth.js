import ajax from './ajax';

export function login(data) {
  return ajax('/users/login', { data, method: 'POST' });
}

export function signup(data) {
  return ajax('/users', { data, method: 'POST' });
}

export function getUserDetails() {
  return ajax('/users/current');
}