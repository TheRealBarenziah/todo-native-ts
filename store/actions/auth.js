import axios from 'axios';
import { LOGIN, LOGOUT, LOG_IN_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR, CHANGE_PASSWORD, CHANGE_PASSWORD_ERROR, DELETE_ACCOUNT, DELETE_ACCOUNT_ERROR } from '../types/auth'
import { baseUrlApi } from '../../apiUrl'

export function login(email, password) {
  return async dispatch => {
    function onSuccess(response) {
      // set token as default header
      axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;

      dispatch({ type: LOGIN, payload: response.data });
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: LOG_IN_ERROR, error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.post(`${baseUrlApi}/auth/signin`, { email, password });
      return onSuccess(response);
    }
    catch (err) {
      return onError(err);
    }
  };
};

export function signUp(userData) {
  return async dispatch => {
    function onSuccess(response) {
      // set token as default header
      axios.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;

      dispatch({ type: LOGIN, payload: response.data });
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: LOG_IN_ERROR, error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.post(`${baseUrlApi}/auth/signup`, userData);
      return onSuccess(response);
    }
    catch (err) {
      return onError(err);
    }
  };
};

export function resetPassword(email) {
  return async dispatch => {
    function onSuccess(response) {
      dispatch({ type: RESET_PASSWORD, payload: response.data });
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: RESET_PASSWORD_ERROR, error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.post(`${baseUrlApi}/auth/reset`, { email });
      return onSuccess(response);
    }
    catch (err) {
      return onError(err);
    }
  };
};

export function editPassword(oldPassword, password) {
  return async (dispatch, getState) => {
    function onSuccess(response) {
      dispatch({ type: CHANGE_PASSWORD, payload: response.data });
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: CHANGE_PASSWORD_ERROR, error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.put(`${baseUrlApi}/auth/change-password`,
        { oldPassword, password, email: getState().auth.user.email },
        { headers: { Authorization: `bearer ${getState().auth.user.token}` } }
      );
      return onSuccess(response);
    }
    catch (err) {
      return onError(err);
    }
  };
};

export function deleteAccount() {
  return async (dispatch, getState) => {
    function onSuccess(response) {
      dispatch({ type: DELETE_ACCOUNT, payload: response.data });
      dispatch(logout());
      return { response, status: 'success' };
    }
    function onError(error) {
      dispatch({ type: DELETE_ACCOUNT_ERROR, error });
      return { error, status: 'error' };
    }
    try {
      const response = await axios.delete(`${baseUrlApi}/auth/delete-account`,
        {
          headers: { Authorization: `bearer ${getState().auth.user.token}` },
          data: { email: getState().auth.user.email }
        }
      );
      return onSuccess(response);
    }
    catch (err) {
      return onError(err);
    }
  };
};

export function logout() {
  axios.defaults.headers.common['Authorization'] = null;
  return {
    type: LOGOUT,
    payload: null
  }
};