import request from './request';
import { CtStorage, getConfig } from './core';

export function resolveDict(data) {
  return request({
    url: getConfig('MANAGE_SERVER_URL') + '/common/getDictList',
    method: 'post',
    params: data
  }).then((res) => {
    CtStorage.setItem(data.dictType, res.dictList);
    const dictData = res.dictList;
    return dictData;
  });
}
