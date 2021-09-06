import { login } from '@/api/user';
import { CtStorage, setToken, exit, setLoginInfo } from '@/utils/core';
import { Routes } from '@/router/index';
const loginInfo = CtStorage.getItem('loginInfo');
const result = handleLoginInfo(loginInfo);

console.log(result);

const state = {
  info: result.info,
  token: result.info.token,
  acls: result.acls,
  menus: result.menus,
  subMenus: result.subMenus,
  unitMap: result.unitMap,
  routes: Routes
};

export function handleLoginInfo(loginInfo) {
  const info = loginInfo || {};
  const { unitList, menuList } = info;
  const acls = [];
  const unitMap = {};
  const menus = menuList || [];
  let submenus = [];
  menus.forEach(item => {
    if (item.menuList) {
      item._children = item.menuList;
      submenus = submenus.concat(item.menuList);
    }
  });
  if (unitList !== undefined && unitList != null) {
    getAcls(unitList, unitMap, acls);
  }
  // if (unitList instanceof Array) {
  //   unitList.forEach((item) => {
  //     if (item.unitCode) {
  //       acls.push(item.unitCode);
  //       unitMap[item.unitCode] = item;
  //     }
  //     if (item.unitAction) {
  //       acls.push(item.unitAction);
  //       unitMap[item.unitAction] = item;
  //     }
  //     // unitType [1-菜单；2-画面；3-操作；4-自定义功能]
  //     const paths = item.unitCodePath.split('|');
  //     if (item.unitType === 1) {
  //       if (paths.length < 2) {
  //         menus.push(item);
  //       } else {
  //         submenus.push(item);
  //       }
  //     }
  //   });
  //   console.log(unitMap);

  //   submenus.forEach(item => {
  //     const rootCode = item.unitCodePath.split('|')[0];
  //     const rootUnit = unitMap[rootCode];
  //     if (!rootUnit) {
  //       return;
  //     }
  //     let children2 = rootUnit._children;
  //     if (!children2) {
  //       children2 = [item];
  //       rootUnit._children = children2;
  //     } else {
  //       children2.push(item);
  //     }
  //   });
  // }

  return { info: info, acls, menus: menus.slice(1) || [], unitMap, submenus };
}

const mutations = {
  SET_INFO: (state, info) => {
    state.info = info;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
    setToken(token);
  },
  SET_ACLS: (state, acls) => {
    state.acls = acls;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  }
};
function getAcls(list, unitMap, acls) {
  list.forEach((item) => {
    if (item.unitCode) {
      acls.push(item.unitCode);
      unitMap[item.unitCode] = item;
    }
    if (item.unitAction) {
      acls.push(item.unitAction);
      unitMap[item.unitAction] = item;
    }
    if (item.menuList) {
      getAcls(item.menuList, unitMap, acls);
    }
    // unitType [1-菜单；2-画面；3-操作；4-自定义功能]
    // const paths = item.unitCodePath.split('|');
    // if (item.unitType === 1) {
    //   if (paths.length < 2) {
    //     menus.push(item);
    //   } else {
    //     submenus.push(item);
    //   }
    // }
  });
}
const actions = {
  login({ commit }, userInfo) {
    const { loginName, userPass, userType } = userInfo;
    return login({ loginName: loginName.trim(), userPass: userPass, userType: userType }).then(res => {
      if (res.result === 1) {
        setLoginInfo(res.data);
        const { info, acls, menus, unitMap } = handleLoginInfo(res.data);

        commit('SET_INFO', info);
        commit('SET_TOKEN', info.token);
        commit('SET_ACLS', acls);
        commit('SET_MENUS', menus);
        state.unitMap = unitMap;
      }
      return res;
      // return store.dispatch('enum/getEnum');
    });
  },
  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_ACLS', []);
    commit('SET_MENUS', []);
    exit();
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ACLS', []);
      commit('SET_MENUS', []);
      exit();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
