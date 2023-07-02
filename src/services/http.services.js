import axios from 'axios';
import { toast } from 'react-toastify';
import localStorageService from './localStorage.services';
import config from '../config.json';
import authService from './auth.services';

const http = axios.create({
  baseURL: config.apiEndpoint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (config.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json';

      if (isExpired) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        });

        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_id,
          localId: data.user_id,
        });
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    } else {
      if (isExpired) {
        const data = await authService.refresh();
        localStorageService.setTokens(data);
      }
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

function transformData(data) {
  return data && !data.id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (config.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    res.data = { content: res.data };
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      toast.error('Something was wrong. Try it later');
    }
    return Promise.reject(error);
  },
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
