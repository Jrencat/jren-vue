import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken, getConfig, getLoginInfo } from '@/utils/core';
import Qs from 'qs';

// create an axios instance
const service = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 20000 // request timeout,
});

const whiteList = ['user/login', 'login.json'];
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const serverUrl = getConfig('SERVER_URL');
    const urlPath = config.url;
    let url = urlPath;
    if (!/:\/\//g.test(url) && !/^(assets)\//g.test(url)) {
      url = serverUrl + url;
    }
    if (config.url.includes('index/alarm/count') || config.url.includes('track/globalRealTimeTracking') || config.url.includes('alarm/getAlarmList')) {
      // 页面头部的报警数量接口，实时监控的接口，报警查看列表接口
      config.timeout = 0; // 指定请求超时的毫秒数(0 表示无超时时间)
    }
    config.url = url;
    if (!whiteList.includes(urlPath)) {
      if (store.getters.token) {
        config.headers['token'] = getToken();
        const userData = getLoginInfo();
        console.log(userData);
        // 校验机构ID 及用户类型
        if (config.params !== null && config.params !== undefined && userData != null && userData != undefined) {
          config.params['facilityId'] = userData.companyId;
          config.params['plat'] = userData.userType;
        }
        if (config.data !== null && config.data !== undefined && userData != null && userData != undefined) {
          config.data = config.data + "&plat=" + userData.userType + "&facilityId=" + userData.companyId;
        }
        if (config.params !== null && config.params !== undefined) {
          config.params['token'] = getToken();
        }
      }
    }
    if (config.params !== null && config.params !== undefined) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.data = Qs.stringify({ ...config.params });
      config.params = null;
    }
    // TODO: 移除空值
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    if (res instanceof Blob || res instanceof ArrayBuffer) {
      return response;
    }
    return res;
  },
  error => {
    const res = error.response;
    if (res) {
      if (res.status === 403) {
        // to re-login
        MessageBox.alert('未登录或token已过期，请重新登录', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        }).catch(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      } else if (res.status === 423) {
        // to re-login
        MessageBox.alert('平台类型不正确，请重新登录！', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        }).catch(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      } else if (res.status === 504) {
        Message({
          message: error.response.data.msg,
          type: 'error',
          duration: 5 * 1000
        });
      } else {
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        });
      }
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      });
    }
    return Promise.reject(error);
  }
);

export default service;
