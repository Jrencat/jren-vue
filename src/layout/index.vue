<template>
  <div class="layout-main" :class="layoutClass">
    <template v-if="settings.layout === 'vertical'">
      <div class="layout-nav">
        <div class="nav-wrapper">
          <AppLogo class="layout-logo" :collapsed="false" />
          <AppMenu v-if="device !== 'mobile'" class="layout-menu" />
          <Navbar class="layout-navbar" />
          <TagsView v-if="settings.tabs" class="layout-tabs" />
        </div>
      </div>
      <div v-if="device === 'mobile'" class="layout-sidebar">
        <AppMenu class="layout-menu" :collapsed="isCollapse" />
      </div>
    </template>
    <template v-else>
      <div class="layout-nav">
        <AppLogo class="layout-logo" :collapsed="isCollapse" />
        <Navbar class="layout-navbar" />
        <TagsView v-if="settings.tabs" class="layout-tabs" />
      </div>
      <div class="layout-sidebar">
        <AppMenu class="layout-menu" :collapsed="isCollapse" />
      </div>
    </template>
    <div class="layout-content">
      <Breadcrumb class="layout-breadcrumb" />
      <AppMain class="layout-page" />
    </div>
    <BackToTop />
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel';
import { AppMain, Navbar, Settings, AppMenu, TagsView } from './components';
import BackToTop from '@/components/BackToTop';
import ResizeMixin from './mixin/ResizeHandler';
import { mapState, mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import AppLogo from './components/AppLogo';

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    Breadcrumb,
    AppMenu,
    TagsView,
    BackToTop,
    AppLogo
  },
  mixins: [
    ResizeMixin
  ],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      layout: state => state.settings.layout
    }),
    layoutClass() {
      return {
        'layout-vertical': this.layout === 'vertical',
        'layout-horizontal': this.layout !== 'vertical',
        'nav-fixed': this.fixedHeader,
        // 'has-tabs': this.settings.tabs,
        // 'has-breadcrumb': this.settings.breadcrumb,
        'sidebar-visible': this.sidebar.visible,
        'sidebar-hidden': !this.sidebar.visible,
        'sidebar-opened': this.sidebar.opened,
        'sidebar-collapsed': !this.sidebar.opened,
        'is-mobile': this.device === 'mobile'
      };
    },
    isCollapse() {
      return this.device === 'mobile' ? false : !this.sidebar.opened;
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';

.layout-main {
  width: 100%;
  height: 100%;
  position: relative;

  &.layout-vertical,
  .nav-wrapper{
    max-width: 1920px;
    margin:  0 auto;
  }
  &:after{
    content: '';
    display: table;
    clear: both;
  }
}

.layout-logo{
  color: #fff;
  background-color: $primary;
  transition: width ease-in-out $base-transition-duration;
  position: relative;
}

.layout-page{
  padding: $base-spacing;
  overflow: hidden;
}

.layout-content{
  height: calc(100% - 50px);
  position: relative;
  background-color: $base-background;
  transition: all ease-in-out $base-transition-duration;
}
.layout-navbar,
.layout-menu{
  transition: all ease-in-out $base-transition-duration;
}

.layout-page{
  min-height: calc(100% - 45px);
}

.is-mobile{
  .layout-content{
    height: calc(100% - 100px);
  }
  .layout-page{
    min-height: calc(100% - 76px);
  }
}

.layout-sidebar {
  position: relative;
  float: left;
  width: $sidebar-width;
  background-color: #222d32;
  transition: all ease-in-out $base-transition-duration;

  &::after{
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: $sidebar-width;
    bottom: 0;
    background-color: #222d32;
    z-index: -1;
    transition: all ease-in-out $base-transition-duration;
  }
}

.layout-main.layout-horizontal {
  .layout-logo{
    float: left;

    &::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      background-color: rgba(0,0,0,.1);
    }
  }

  .layout-nav {
    width: 100%;
    position: relative;
    z-index: 5;
    &::after{
      content: '';
      clear: both;
    }
  }
  .layout-menu{
    width: $sidebar-width;
  }

  .layout-navbar,
  .layout-content {
    margin-left: $sidebar-width;

  }

  &.sidebar-collapsed{
    .layout-logo,
    .layout-sidebar,
    .layout-menu{
      width: $sidebar-width-mini;
    }
    .layout-sidebar::after{
      width: $sidebar-width-mini;
    }
    .layout-navbar,
    .layout-content {
      margin-left: $sidebar-width-mini;
    }
  }

  &.is-mobile {
    .layout-logo {
      width: 100%;
      float: none;
    }
    .layout-navbar {
      margin: 0;
    }
  }
}

.layout-main.layout-vertical {
  .layout-nav {
    background-color: $primary;
  }
  .nav-wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .layout-logo{
    width: auto;
  }
  .layout-menu{
    flex: 1;
  }
  .layout-navbar{
    background: none;
  }
}

.layout-main.is-mobile.layout-vertical,
.layout-main.is-mobile.layout-horizontal {
  .layout-logo{
    width: 100%;
  }
  .layout-nav {
    width: 100%;
    position: relative;
    z-index: 5;
    &::after{
      content: '';
      clear: both;
    }
  }
  .layout-navbar{
    flex: 1;
  }
  .layout-sidebar {
    width: 0;
    &::after{
      width: $sidebar-width;
      left: - $sidebar-width;
    }
  }
  .layout-menu{
    width: $sidebar-width;
    transform: translateX(-100%);
  }
  .layout-content {
    margin-left: 0;
    transform: translateX(0);
  }
  &.sidebar-visible {
    .layout-menu{
      transform: translateX(0);
    }
    .layout-sidebar::after{
        left: 0;
    }
    .layout-content{
      transform: translateX($sidebar-width);
    }
  }
  &.sidebar-hidden:not(.nav-fixed) {
    .layout-sidebar{
      height: 0;
    }
  }
}

.layout-main.nav-fixed.layout-vertical,
.layout-main.nav-fixed.layout-horizontal {
  .layout-nav {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    transition: all ease-in-out $base-transition-duration;
    box-shadow: 0 0 14px rgba(0,0,0,.5);
  }

  .layout-content {
    padding-top: $navbar-height;
    height: 100%;
  }

  .layout-sidebar{
    position: fixed;
    left: 0;
    top: $navbar-height;
    bottom: 0;
  }

  &.is-mobile{
    .layout-content {
      padding-top: $navbar-height * 2;
    }
    .layout-sidebar{
      top: $navbar-height * 2;
    }
  }

}

</style>
