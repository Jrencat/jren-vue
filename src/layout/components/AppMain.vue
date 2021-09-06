<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tabs.cachedViews;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
$header-height: $navbar-height + $breadcrumb-height;
// $height: calc(100vh - $header-height);
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100% - 28px);
  // margin-bottom: $base-spacing;
  width: 100%;
  position: relative;
  overflow: hidden;
  // background-color: #fff;
  // border-radius: $base-radius;
  // box-shadow: $base-shadow;
  // padding: $base-spacing/2;

}

</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
