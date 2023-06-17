import axios from 'axios';
import { get } from 'lodash';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { setUser, updateUserProfile, updateUserSocialConnection } from './user';
import { IAuthState, IProfile, ISocialConnection } from './types';

/**
 * Sets the user email in the redux.
 *
 * @param {string} email - The user email to be set.
 * @returns {void} This function does not return anything.
 */
export function setEmail(email: string) {
  return {
    type: 'SET_EMAIL',
    payload: email
  };
}

/**
 * Sets the auth0 token in the redux.
 *
 * @param {string} token - The auth0 token to be set.
 * @returns {void} This function does not return anything.
 */
export function setToken(token: string) {
  return {
    type: 'SET_TOKEN',
    payload: token
  };
}

/**
 * Handler redirect according to selected action
 *
 * @param {any} selectedAction - The sleeted Action object
 * @returns {void} This function does not return anything.
 */
export const redirectHandler = () => {
  Router.push('/');
};

/**
 * Set user profile and social connection after user create
 *
 * @param {any} response - User create API response
 * @param {string} token - Auth0 token
 * @param {any} data -  {type, state}
 * @returns {void} This function does not return anything.
 */
export const createUserCallBack =
  (token: string, data: any) => (dispatch: any) => {
    const encryptData: any = jwtDecode(token);
    const email = get(encryptData, 'email', '');
    const profile: IProfile = { lastLogin: new Date() };

    if (data.type === 'sso') {
      /* Check sso login name and set data to profile */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [type, ssoName] = data.state.split('|');
      switch (ssoName) {
        case 'google-oauth2': {
          profile.username = get(encryptData, 'name', '');
          profile.avatar = get(encryptData, 'picture', '').replace(
            '=s96-c',
            ''
          );
          break;
        }
        default: {
          profile.username = get(encryptData, 'name', '');
          profile.avatar = get(encryptData, 'picture', '');
        }
      }
      const socialConnection: ISocialConnection = {
        name: ssoName,
        sub: encryptData.sub
      };
      dispatch(updateUserSocialConnection(socialConnection));
    } else {
      profile.username = email;
      profile.avatar = '';
    }
    dispatch(setEmail(email));
    dispatch(updateUserProfile(profile));
    dispatch(redirectHandler());
    // dispatch(connect())
  };

/**
 * To create a user using auth0 token
 *
 * @param {IUser} data - contain {email, token}.
 * @returns {any} This function return API response.
 */
export const createUser =
  (token: string, data: any, callBack: any) => (dispatch: any) => {
    return axios({
      url: `${process.env.ImApiUrl}/v1/user/create`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'post',
      responseType: 'json'
    })
      .then((response: any) => {
        dispatch(setToken(token));
        dispatch(callBack(token, data));
        return response;
      })
      .catch(() => {
        return false;
      });
  };

/**
 * To send login otp on given email
 *
 * @param {any} values - contain login form value.
 * @returns {any} This function return API response.
 */
export const startLoginWithOtp = (values: any) => (dispatch: any) => {
  dispatch(setEmail(get(values, 'email', '')));
  return axios({
    url: `${process.env.ImApiUrl}/v1/auth/sendOTPToEmail`,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: values,
    responseType: 'json'
  })
    .then((response: any) => {
      return response;
    })
    .catch(() => {
      return false;
    });
};

/**
 * To verify auth0 opt received on email
 *
 * @param {string} otp - Auth0 verification otp.
 * @returns {any} This function return API response.
 */
export const verifyOtp = (otp: string) => (dispatch: any, getState: any) => {
  const url = `${process.env.ImApiUrl}/v1/auth/verifyOtp`;
  const { email } = getState().auth;
  const data = {
    email: email,
    otp
  };
  return axios({
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data,
    responseType: 'json'
  })
    .then((response) => {
      const token = get(response, 'data.data.token', '');
      dispatch(setToken(token));
      const lastLogin = new Date();
      const user = get(response, 'data.data.user', false);
      if (user) {
        /* Login If user is exist */
        dispatch(setUser(user));
        dispatch(updateUserProfile({ lastLogin }));
        dispatch(redirectHandler());
      } else {
        /* If user is not exist create user */
        const createData: any = {
          email,
          profile: { lastLogin },
          type: 'custom'
        };
        dispatch(createUser(token, createData, createUserCallBack));
      }

      return response;
    })
    .catch(() => {
      toast.error('Something went wrong!');
      return false;
    });
};

/**
 * To sign-in/sign-up using social media
 *
 * @param {any} parsedQuery - Auth0 token.
 * @returns {any} This function return API response.
 */
export const socialSignOn = (parsedQuery: any) => (dispatch: any) => {
  const { state, id_token: token } = parsedQuery;
  return axios({
    url: `${process.env.ImApiUrl}/v1/user/detail`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'get',
    responseType: 'json'
  })
    .then((response) => {
      dispatch(setToken(token));
      const lastLogin = new Date();
      const user = get(response, 'data.data', {});
      if (user) {
        /* If user exist login */
        dispatch(setUser(user));
        dispatch(updateUserProfile({ lastLogin }));
        dispatch(redirectHandler());
      } else {
        /* If user not exist create user using sso token */
        dispatch(createUser(token, { type: 'sso', state }, createUserCallBack));
      }
      return response;
    })
    .catch((error: any) => {
      const statusCode = get(error, 'response.data.statusCode', 500);
      if (statusCode === 404) {
        /* If user not exist create user using sso token */
        dispatch(createUser(token, { type: 'sso', state }, createUserCallBack));
      }
      Router.push('/signin');
      return false;
    });
};

// Initialize default state value
const initialState: IAuthState = {
  email: '',
  token: ''
};

/**
 * To set auth object in redux
 *
 * @param {any} state - Redux state
 * @param {any} action - Redux action
 * @returns {any} This function return redux user state.
 */
const auth = (state = initialState, action: any): IAuthState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
};

export default auth;
