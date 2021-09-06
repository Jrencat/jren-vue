<template>
  <div class="navbar-wrapper">
    <template v-if="settings.layout ==='horizontal' || device === 'mobile'">
      <div class="navbar-item hover-effect" @click="toggleSideBar">
        <i class="fas fa-bars " />
      </div>
    </template>
    <div class="navbar-spacer" />
    <Search v-if="settings.layout === 'vertical' && device !== 'mobile'" mode="button" />
    <Screenfull v-if="device !== 'mobile'" class="navbar-item hover-effect" />
    <!-- <div class="navbar-item hover-effect">
      <ElBadge :hidden="total < 1" :type="'success'" :max="99" :value="total"> <i class="fas fa-envelope" /> </ElBadge>
    </div>
    <div class="navbar-item hover-effect">
      <ElBadge :hidden="total < 1" :type="'warning'" :max="99" :value="total">
        <i class="fas fa-bell" />
      </ElBadge>
    </div>
    <div class="navbar-item hover-effect">
      <ElBadge :hidden="total < 1" :type="'danger'" :max="99" :value="total"> <i class="fas fa-flag" /></ElBadge>
    </div>-->
    <ElDropdown class="navbar-item hover-effect" trigger="click">
      <div class="user-wrapper">
        <ElAvatar :size="25" :src="userAvatar" />
        <span class="user-name">{{ userName }}</span>
      </div>
      <ElDropdownMenu slot="dropdown">
        <ElDropdownItem v-if="adminFlg" @click.native="changeCompanyInfo">修改公司信息</ElDropdownItem>
        <ElDropdownItem @click.native="changePassword">修改密码</ElDropdownItem>
        <ElDropdownItem @click.native="logout">退出登录</ElDropdownItem>
      </ElDropdownMenu>
    </ElDropdown>
    <div class="navbar-item hover-effect" @click="drawerOpened = !drawerOpened">
      <i class="fas fa-cogs" />
    </div>
    <el-drawer
      :append-to-body="true"
      :show-close="false"
      :with-header="false"
      :visible.sync="drawerOpened"
      :wrapper-closable="true"
      @opened="onDrawerOpened"
      @closed="onDrawerClosed"
    >
      <Settings />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Screenfull from '@/components/Screenfull';
import { getConfig, getLoginInfo } from '@/utils/core';
import { formatTime } from '../../utils';
import AppLogo from './AppLogo';
import Search from '@/components/NavSearch';
import Settings from './Settings';

export default {
  components: {
    Screenfull,
    Search,
    Settings
  },

  data: () => {
    const userData = getLoginInfo();
    return {
      adminFlg: userData.adminFlg === 1,
      drawerOpened: false,
      total: 12 // 右上角报警的数量
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'device'
    ]),
    userName() {
      return this.user?.userName || '';
    },
    userAvatar() {
      return this.user?.userAvatar || 'assets/avatar-default.jpg';
    }
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    async logout() {
      this.$confirm('是否确定退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout');
        this.$router.push(`/login`);
      }).catch(() => {
      });
    },
    changePassword() {
      this.drawerOpened = false;
      this.$router.push({
        path: '/changePsw'
      });
    },
    changeCompanyInfo() {
      this.drawerOpened = false;
      this.$router.push({
        path: '/companyInfo'
      });
    },
    toggleSideBar() {
      if (this.device === 'mobile') {
        this.$store.dispatch('app/toggleSideBarVisible');
      } else {
        this.$store.dispatch('app/toggleSideBarOpened');
      }
    },
    toggleDrawer() {
      this.drawerOpened = !this.drawerOpened;
    },
    onDrawerOpened() {
      // this.drawerOpened = true;
    },
    onDrawerClosed() {
      // this.drawerOpened = false;
    }
  }

};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';

$navbar-content-height: $navbar-height - $base-spacing;
.navbar-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  height: $navbar-height;
  background-color: $navbar-background-color;
  color: $navbar-text-color;
  font-size: 14px;
  >*{
    &:last-child{
      margin-right: $base-spacing;
    }
  }
}

.navbar-spacer{
  flex: 1;
}
.navbar-divider{
  border-right: 1px solid #ffffff;
  height: 16px;
  margin: 0 20px;
  width: 0;
  display: inline-block;
}

.app-sidebar-toggle + .app-logo{
  margin-left: $base-spacing;
}
.app-logo + .app-sidebar-toggle{
  margin-left: $base-spacing;
}
.navbar-item {
  padding: 0 $base-spacing;
  min-width: 36px;
  height: 100%;
  font-size: 14px;
  color: #fff;
  display: flex !important;
  align-items: center;
  text-align: center;
  cursor: pointer;

  &.hover-effect {
    transition: background $base-transition-duration;

    &:hover {
      background: rgba(0, 0, 0, .15)
    }
  }
  &:last-child{
    margin-right: $base-spacing;
  }
}
.navbar-icon {
  &[class^=el-icon-]{
    font-size: 18px;
  }
  &.svg-icon{
    width: 18px;
    height: 18px;
    fill: currentColor;
    &.nav-user{
      width: 21px;
      height: 21px;
    }
  }

}
.user-wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: - $base-spacing;
  margin-right: - $base-spacing;
  padding: 0 $base-spacing;

}

.user-name {
  user-select: none;
  line-height: $navbar-height;
  &:not(:empty){
    margin-left: $base-spacing / 2;
  }
}
.drawer-menu{
  list-style: none;
  padding: 0;
  margin: 0;
  >li{
    padding: $base-spacing $base-spacing * 2;
    line-height: 2;
    cursor: pointer;
    user-select: none;
    &:hover{
      color: $primary;
      background-color: #f2f2f2;
    }
    &+li{
      border-top: 1px solid #eee;
    }
  }
}
</style>
