import axios from 'axios';
// import { getToken, setToken } from '../helpers/localStorageCache';

const clientUrl = (uri) => {
  const uriPath = uri.startsWith('/') ? uri : `/${uri}`;

  return `http://localhost:3001/api${uriPath}`;
};

const objectToFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;
  const objectKeys = Object.keys(obj);

  objectKeys.forEach((property) => {
    if (namespace) {
      formKey = `${namespace}[${property}]`;
    } else {
      formKey = property;
    }

    const value = obj[property];

    if (Array.isArray(value)) {
      // value is an Array
      arrayToFormData(fd, formKey, value); // eslint-disable-line no-use-before-define
    } else if (typeof value === 'object' && !(value instanceof File)) {
      // value is a nested object
      objectToFormData(value, fd, formKey);
    } else {
      // value is a string or a File object
      fd.append(formKey, value);
    }
  });

  return fd;
};

const arrayToFormData = (fd, formKey, value) => {
  value.forEach((a) => {
    if (typeof a === 'object' && !(a instanceof File)) {
      // elements of array is nested object
      objectToFormData(value, fd, `${formKey}[]`);
    } else {
      // elements of array is string or File object
      fd.append(`${formKey}[]`, a);
    }
  });
};

const buildParam = (params, asJSON = true) => {
  if (asJSON) {
    return JSON.stringify(params);
  }
  return objectToFormData(params);
};

const getDefaultOptions = () => ({ method: 'GET', headers: {} });

function ajax(uri, options = {}) {
  let defaultOptions = getDefaultOptions();

  const token = localStorage.getItem('accessToken');

  defaultOptions = { ...defaultOptions, method: options.method || defaultOptions.method };

  if (token) defaultOptions.headers['Authorization'] = `Bearer ${token}`;

  if (options.data) {
    if (options.formData) {
      defaultOptions.data = buildParam(options.data, false);
    } else {
      defaultOptions.headers['Content-Type'] = 'application/json; charset=UTF-8';
      defaultOptions.data = buildParam(options.data);
    }
  }

  defaultOptions.url = clientUrl(uri);

  return axios(defaultOptions);
}

export default ajax;