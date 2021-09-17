import request from '@/utils/request';

export function login(data) {
  return request({
    url: 'login.json',
    method: 'get',
    data: {
      loginNo: data.username,
      pwd: data.password
    }
  });
}

/**
 * 获取枚举数据
 */
export function getEnum() {
  return null;
}
