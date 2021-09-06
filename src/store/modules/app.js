import { CtStorage } from '@/utils/core';

const SIDEBAR_STATUS = 'app.sidebarOpened';
const APP_SIZE = 'app.size';
const state = {
  sidebar: {
    opened: !!CtStorage.getItem(SIDEBAR_STATUS, { defaultValue: true }),
    visible: true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: CtStorage.getItem(APP_SIZE, { defaultValue: 'medium' }),
  loading: false
};

const mutations = {
  TOGGLE_SIDEBAR_VISIBLE: (state, { visible, withoutAnimation }) => {
    state.sidebar.withoutAnimation = !!withoutAnimation;
    if (typeof visible === 'boolean') {
      state.sidebar.visible = visible;
    } else {
      state.sidebar.visible = !state.sidebar.visible;
    }
  },
  TOGGLE_SIDEBAR_OPENED: (state, { opened, withoutAnimation }) => {
    state.sidebar.withoutAnimation = !!withoutAnimation;
    if (typeof opened === 'boolean') {
      state.sidebar.opened = opened;
    } else {
      state.sidebar.opened = !state.sidebar.opened;
    }
    if (state.sidebar.opened) {
      CtStorage.setItem(SIDEBAR_STATUS, true);
    } else {
      CtStorage.setItem(SIDEBAR_STATUS, false);
    }
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  TOGGLE_LOADING: (state, loading) => {
    state.loading = loading;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    CtStorage.setItem(APP_SIZE, size);
  }
};

const actions = {
  toggleSideBarOpened({ commit }, option) {
    let opened, withoutAnimation;
    if (option) {
      opened = option.opened;
      withoutAnimation = option.withoutAnimation;
    }
    commit('TOGGLE_SIDEBAR_OPENED', { opened, withoutAnimation });
  },
  toggleSideBarVisible({ commit }, option) {
    let visible, withoutAnimation;
    if (option) {
      visible = option.visible;
      withoutAnimation = option.withoutAnimation;
    }
    commit('TOGGLE_SIDEBAR_VISIBLE', { visible, withoutAnimation });
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
