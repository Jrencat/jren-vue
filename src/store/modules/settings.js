import { CtStorage, getConfig } from '@/utils/core';

const state = {
  theme: CtStorage.getItem('settings.theme', { defaultValue: getConfig('APP.THEME') }),
  // showSettings: CtStorage.getItem('showSettings', { defaultValue: false }),
  tabs: CtStorage.getItem('settings.tabs', { defaultValue: false }),
  breadcrumb: CtStorage.getItem('settings.breadcrumb', { defaultValue: true }),
  fixedHeader: CtStorage.getItem('settings.fixedHeader', { defaultValue: false }),
  layout: CtStorage.getItem('settings.layout', { defaultValue: 'horizontal' })
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      CtStorage.setItem('settings.' + key, value);
    }
  }
};

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

