<template>
  <div class="content-header">
<!--    <h1 class="content-title">{{ title }}</h1>-->
    <el-breadcrumb v-if="settings.breadcrumb" separator=">" class="breadcrumb-wrapper">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in items" :key="item.title">
          <span v-if="index==items.length-1" class="no-redirect">{{ item.title }}</span>
          <a v-else @click.prevent="handleLink(item)">{{ item.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import uniqBy from 'lodash.uniqby';

export default {
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapGetters([
      'unitMap',
      'settings'
    ]),
    title() {
      return this.items.slice(-1)[0]?.title;
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    parentItem(unit, items) {
      if (unit) {
        if (!this.$_checkIsEmpty(unit.path)) {
          items = [{
            title: unit.meta.title,
            path: unit.path },
          ...items
          ];
        }
        if (!this.$_checkIsEmpty(unit.parent)) {
          this.parentItem(unit.parent, items);
        }
      }
      return items;
    },
    getBreadcrumb() {
      const { path, params } = this.$route;
      const home = { title: '首页', path: '/' };
      let items = [];
      const action = path;
      // const values = Object.values(params);
      // if (values.length > 0) {
      //   action = path.substring(0, path.length - ('/' + values[0]).length);
      // }
      const unit = this.$route.matched.filter(function(res) {
        if (res.path === action) {
          return res;
        }
      });
      if (unit) {
        items = [{ title: unit[0].meta.title, path: unit[0].path }];
        if (!this.$_checkIsEmpty(unit[0].parent)) {
          items = this.parentItem(unit[0].parent, items);
        }
        items = [home, ...items];
      }
      items = uniqBy(items, 'title');
      this.items = items;
    },
    /* getBreadcrumb() {
      const { path, params } = this.$route;
      const home = { title: '首页', path: '/' };
      let items = [];
      let action = path;
      const values = Object.values(params);
      if (values.length > 0) {
        action = path.substring(0, path.length - ('/' + values[0]).length);
      }
      const unit = this.unitMap[action];
      if (unit) {
        const names = unit.unitNamePath.split('|');
        items = [home].concat(unit.unitCodePath.split('|').map((code, index) => {
          return { title: names[index], path: this.unitMap[code] && this.unitMap[code].unitAction };
        }));
      } else {
        console.log(this.$route);
        items = [home, { title: this.$route.meta?.title, path: this.$route.meta?.fullPath }];
      }
      items = uniqBy(items, 'title');
      this.items = items;
    },*/
    handleLink(item) {
      if (item.path) {
        this.$router.push(item.path);
      }
    }
  }
};
</script>
<style lang="scss">
    .is-mobile{
      .content-header{
        .content-title{
          width: 100%;
        }
        .breadcrumb-wrapper{
          width: 100%;
          background-color: #d2d6de;
          margin-top: 5px;
          // height: $breadcrumb-height
        }
      }
    }
</style>
<style lang="scss" scoped>
  @import '~@/styles/variables.scss';
  .content-header{
    $title-font-size: 20px;
    position: relative;
    line-height: 0;
    padding:  $base-spacing  $base-spacing  0 $base-spacing;
    overflow: hidden;

    .content-title{
      margin: 0;
      float: left;
      font-size: $title-font-size;
      line-height: 26px;
      font-weight: 500;
    }
    .breadcrumb-wrapper{
      // float: right;
      // margin-top: $title-font-size - 12px;
    }
    // &::after{
    //   content: '';
    //   display: table;
    //   clear: both;
    // }
  }
  .breadcrumb-wrapper {
    font-size: 13px;
    line-height: 26px;
    padding: 0 $base-spacing;
  }
</style>
