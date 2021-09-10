<template>
  <div class="menu-wrapper" :class="menuClass">
    <div v-if="settings.layout === 'horizontal'" class="menu-user">
      <ElAvatar :size="avatarSize" :src="userAvatar" class="menu-avatar" />
      <div v-if="sidebar.opened" class="menu-username">
        <div class="user-name" :title="userName">{{ userName }}</div>
        <div class="user-status">Online</div>
      </div>
    </div>
<!--    <Search v-if="hasSearch && sidebar.opened" mode="input" :transparent="true" class="menu-search" />-->
    <div v-if="sidebar.opened && settings.layout === 'horizontal'" class="menu-divider"> MAIN NAVIGATION </div>
    <div class="menu-main">
      <template v-if="settings.fixedHeader && menuMode === 'vertical' || device === 'mobile'">
        <ElScrollbar class="menu-scrollbar">
          <ElMenu
            :default-active="activeMenu"
            :default-openeds="openMenus"
            :collapse="collapsed"
            :unique-opened="true"
            :collapse-transition="false"
            :mode="menuMode"
          >
            <!-- @open="openHandle" -->
            <AppMenuItem v-for="menu in visibleMenus" :key="menu.unitCode" :item="menu" />
          </ElMenu>
        </ElScrollbar>
      </template>
      <template v-else>
        <ElMenu
          :default-active="activeMenu"
          :default-openeds="openMenus"
          :collapse="collapsed"
          :unique-opened="true"
          :collapse-transition="false"
          :mode="menuMode"
        >
          <!-- @open="openHandle" -->
          <AppMenuItem v-for="menu in visibleMenus" :key="menu.unitCode" :item="menu" />
        </ElMenu>
      </template>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppMenuItem from './AppMenuItem';
import Search from '@/components/NavSearch';

export default {
  components: {
    AppMenuItem,
    Search
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'menus',
      'sidebar',
      'unitMap',
      'device',
      'settings',
      'user'
    ]),
    avatarSize() {
      return this.sidebar.opened ? 45 : 30;
    },
    userName() {
      return this.user?.userName || '';
    },
    userAvatar() {
      return this.user?.userAvatar || 'assets/avatar-default.jpg';
    },
    visibleMenus() {
      if (this.device === 'mobile') {
        return this.menus;
      } else if (this.settings.layout === 'vertical') {
        return this.menus.slice(0, 3);
      } else {
        return this.menus;
      }
    },
    hasSearch() {
      return this.device !== 'mobile' && this.settings.layout === 'horizontal';
    },
    menuMode() {
      return this.device === 'mobile' ? 'vertical' : (this.settings.layout === 'vertical' ? 'horizontal' : 'vertical');
    },
    menuClass() {
      const key = 'mode-' + this.menuMode;
      return {
        [key]: true,
        'has-search': this.hasSearch,
        'is-collapsed': !this.sidebar.opened
      };
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path, params } = route;
      let action = path;
      const values = Object.values(params);
      if (values.length > 0) {
        action = path.substring(0, path.length - ('/' + values[0]).length);
      }
      let unit = {};
      let codePath = '';
      if (action) {
        unit = this.unitMap[action] || {};
        codePath = this.findMenuCodePath(unit);
      }
      return codePath;
    },
    openMenus() {
      const route = this.$route;
      const { meta, path, params } = route;
      let action = path;
      const values = Object.values(params);
      if (values.length > 0) {
        action = path.substring(0, path.length - ('/' + values[0]).length);
      }
      let unit = {};
      let codePath = '';
      if (action) {
        unit = this.unitMap[action] || {};
        codePath = unit.unitCodePath || '';
      }
      // return [codePath.split('|')[0]];
      return ['U01', 'U02', 'U03'];
    }
  },
  methods: {
    findMenuCodePath(unit) {
      if (!unit.unitCodePath) {
        return '';
      }
      if (unit.unitType === 1) {
        return unit.unitCodePath;
      } else {
        const parent = this.unitMap[unit.parentUnitCode] || {};
        return this.findMenuCodePath(parent);
      }
    },
    openHandle(key, path) {
      // const currentCode = key.split('|')?.slice(-1) || null;
      // const router = currentCode ? this.unitMap[currentCode] : {};
      // const action = router ? router.unitAction : null;
      // if (action) {
      //   this.$router.push(action);
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '@/styles/variables.scss';

  .menu-wrapper{
    transition: padding ease-in-out $base-transition-duration;
    &.mode-vertical{
      height: 100%;
      // &.has-search{
      //   padding-top: $navbar-height;
      // }
      .menu-main{
        height: 100%;
      }
      &.is-collapsed{
        padding-top: 0;
      }
    }
    &.mode-horizontal{
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .menu-user{
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #fff;
  }
  .menu-username{
     margin-left: 15px;
     line-height: 1.25;
  }
  .user-name{
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-status{
    font-size: 11px;
    margin-top: 8px;
    &:before{
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #3c763d;
      margin-right: 5px;
    }
  }
  .menu-search{
    display: flex;
    margin: 0 10px;
    align-items: center;
  }
  .menu-divider{
    color: #4b646f;
    background: #1a2226;
    padding: 10px 25px 10px 15px;
    font-size: 12px;
  }
  .el-scrollbar{
    height: 100%;
  }
</style>
