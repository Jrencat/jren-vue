<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">布局设置</h3>

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker class="drawer-input" @change="themeChange" />
      </div>
      <div class="drawer-item">
        <span>布局方式</span>
        <div class="drawer-input">
          <el-radio v-model="layout" label="horizontal">左右</el-radio>
          <el-radio v-model="layout" label="vertical">上下</el-radio>
        </div>
        <!-- <el-radio-group v-model="layout">
          <el-radio-button label="horizontal">左右</el-radio-button>
          <el-radio-button label="vertical">上下</el-radio-button>
        </el-radio-group> -->
      </div>
      <!-- <div class="drawer-item">
        <span>显示标签页</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>显示面包屑</span>
        <el-switch v-model="breadcrumb" class="drawer-switch" />
      </div> -->

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch  v-model="fixedHeader" class="drawer-input" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker';
import { updateCssVariables } from '@/utils/core';

export default {
  components: { ThemePicker },
  data() {
    return {};
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        });
      }
    },
    breadcrumb: {
      get() {
        return this.$store.state.settings.breadcrumb;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'breadcrumb',
          value: val
        });
      }
    },
    layout: {
      get() {
        return this.$store.state.settings.layout;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'layout',
          value: val
        });
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tabs;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tabs',
          value: val
        });
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      });
      updateCssVariables(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;

  }

  .drawer-input {
    float: right
  }
}
</style>
