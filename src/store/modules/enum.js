import { CtStorage } from '@/utils/core';
import { getEnum } from '@/api/user';

const ENUM_KEY = 'enum';
const enumData = CtStorage.getItem(ENUM_KEY);

const state = {
  enum: enumData || {}
};

const mutations = {
  UPDATE_ENUM: (state, data) => {
    state.enum = { ...state.enum, ...data };
    CtStorage.setItem(ENUM_KEY, state.enum);
  }
};

const actions = {
  update({ commit }, data) {
    console.log(arguments);
    if (data && typeof data === 'object') {
      commit('UPDATE_ENUM', data);
    }
  },
  getEnum({ commit }) {
    return getEnum().then(res => {
      try {
        commit('UPDATE_ENUM', JSON.parse(res.data));
      } catch (error) {
        console.log(error);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
