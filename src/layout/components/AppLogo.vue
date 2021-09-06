<template>
  <!-- <div class="logo"> -->
  <router-link class="logo-link" :class="{collapsed: collapsed}" to="/">
    <!-- <i class="el-icon-connection logo-image" /> -->
    <span class="logo-image">Jren</span>
    <!-- <img v-if="appLogo" :src="appLogo" class="logo-image"> -->
    <h1 class="logo-title">{{ appName }} </h1>
  </router-link>
  <!-- </div> -->
</template>

<script>
import { getConfig } from '@/utils/core';
import { mapGetters } from 'vuex';

export default {
  name: 'AppLogo',
  components: {
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  computed: {
    appName() {
      return getConfig('APP.PLAT_NAME');
    },
    appLogo() {
      return getConfig('APP.LOGO');
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  @import  '@/styles/variables.scss';

  .logo-image {
    position: relative;
    z-index: 1;
    font-size: 1.2em;
  }

  .logo-title {
    position: relative;
    z-index: 1;
    margin: 0;
    margin-left: $base-spacing / 2;
    font-weight: 400;
    font-size: 14px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    white-space: nowrap;
    text-overflow: clip;
    transition: all ease-in-out $base-transition-duration;
  }

  .logo-link {
    padding: 0 $base-spacing;
    width: $sidebar-width;
    height: $navbar-height;
    line-height: $navbar-height;
    text-align: left;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    justify-content: center;

    &.collapsed {
      width: $sidebar-width-mini;
      .logo-title {
        opacity: 0;
        width: 0;
      }
    }
  }
</style>
