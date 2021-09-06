import request from '@/utils/request';

export function login2(data) {
  return request({
    url: 'login.json',
    method: 'get',
    params: data
  });
}

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
