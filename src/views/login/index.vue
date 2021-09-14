<template>
  <div class="login-container">
    <div class="login-bg" :style="backgroundStyle" />
    <h1 style="padding: 0px 0px 0px 20px;letter-spacing: 9px">
      <span>{{ areaName }}</span>
    </h1>

    <div class="title-container" style="margin: 130px auto 0 auto">
      <h3 class="title">
        <!-- <i class="el-icon-connection title-logo" /> -->
        <!--          <el-image :src="appLogo" fit="fill" class="title-logo" />-->
        <span class="title-text" style="font-size: 60px">{{ appName }}</span></h3>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="login-form-body">
        <div class="title-container" style="margin-bottom: 32px">
          <h3 class="title" style="font-size: 28px">
            <span style="color: #4AB7BD" class="title-text">{{ childName }}</span>
          </h3>
        </div>
        <el-form-item prop="username">
          <!-- <span class="svg-container">
            <svg-icon icon-class="user" />
          </span> -->
          <el-input
            ref="username"
            v-model="loginForm.loginName"
            size="medium"
            prefix-icon="el-icon-user"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            :maxlength="20"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <!-- <span class="svg-container">
              <svg-icon icon-class="password" />
            </span> -->
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.userPass"
              size="medium"
              prefix-icon="el-icon-key"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              :maxlength="16"
              :minlength="6"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span> -->
          </el-form-item>
        </el-tooltip>

        <el-button size="medium" :loading="loading" type="primary" class="login-submit" @click.native.prevent="handleLogin">登录</el-button>

      </div>
      <div class="title-container" style="top: 220px">
        <h5 class="title">
          <!-- <i class="el-icon-connection title-logo" /> -->
          <el-image :src="appLogo" fit="fill" class="title-logo" />
        </h5>
        <h3>
          <span >{{ footerName }}</span>
        </h3>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';
import { getConfig } from '@/utils/core';
import { mapGetters } from 'vuex';
import store from '../../store';
import { login } from '@/api/user';

export default {
  name: 'Login',
  components: { },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不少于6个字符'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginName: 'admin',
        userPass: '1234567'
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        userPass: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      selectDialogVisible: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  computed: {
    appName() {
      return getConfig('APP.NAME');
    },
    areaName() {
      return getConfig('APP.AREA_NAME');
    },
    childName() {
      return getConfig('APP.CHILD_NAME');
    },
    footerName() {
      return getConfig('APP.FOOTER_NAME');
    },
    appLogo() {
      return getConfig('APP.LOGO');
    },
    backgroundStyle() {
      const background = getConfig('APP.LOGIN_BACKGROUND');
      return {
        backgroundImage: 'url(' + background + ')'
      };
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
    // 自动登录
    this.loginForm.username = 'admin';
    this.loginForm.password = '1234567';
    this.handleLogin();
  },
  destroyed() {
  },
  methods: {
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z');
    },
    // showPwd() {
    //   if (this.passwordType === 'password') {
    //     this.passwordType = '';
    //   } else {
    //     this.passwordType = 'password';
    //   }
    //   this.$nextTick(() => {
    //     this.$refs.password.focus();
    //   });
    // },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          console.log('login submit');
          /* login({ loginName: this.loginForm.loginName, userPass: this.loginForm.userPass, userType: 1 })
            .then(res => {
              if (res.result === 1) {
                console.log('redirect');
                this.$router.push({ path: '/dashboard' });
                this.$store.dispatch('enum/getEnum');
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                });
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
            });*/
          this.loginForm.userType = 1;
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
              if (res.result === 1) {
                if (this.loginForm.userPass === '123456') {
                  this.$router.push({ path: '/enforceChangePsw' });
                } else {
                  this.$router.push({ path: '/dashboard' });
                  this.$store.dispatch('enum/getEnum');
                }
              } else {
                this.$message({
                  type: 'error',
                  message: res.msg
                });
                this.loginForm.userPass = null;
                this.loginForm = {...this.loginForm};
                this.loading = false;
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
@import '~@/styles/variables.scss';

$cursor: #fff;
$input-color: #333;

.login-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f2f2f2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.1;
  // opacity: 0.8;
  // &::before{
  //   content: '';
  //   display: block;
  //   height: 4px;
  //   background-color: $primary;
  // }
}

.login-container {
  min-height: 100%;
  width: 100%;
//   background-color: $primary;
  overflow: hidden;

//   .el-form-item {
//     background: none;
//     border-radius: 0;
//     color: $input-color;
//   }

//   .el-form-item__content{
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }

//   .el-input {
//     height: 47px;
//     flex: 1;
//     .el-input__inner{
//       padding-left: 48px;
//       border-bottom: 1px solid #666;
//       &:focus{
//         border-bottom: 1px solid $primary;
//       }
//     }

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px;
//       color: $input-color;
//       height: 47px;
//     }
//   }

//   .svg-container {
//     box-sizing: border-box;
//     font-size: 1.5em;
//     vertical-align: middle;
//     width: 40px;
//     height: 40px;
//     text-align: center;
//     display: inline-block;
//     position: absolute;
//     top: 4px;
//     left: 4px;
//     z-index: 1;
//   }

  .title-container {
    position: relative;
    margin-bottom: 32px;
    text-align: center;

    .title {
      line-height: 1.5;
      display: inline-block;
      font-size: 35px;
      color: #666;
      margin: 0;
      font-weight: bold;
      position: relative;
      letter-spacing: 3px;
      // &::after{
      //   opacity: 0.5;
      //   content: '';
      //   display: block;
      //   border-bottom: 8px solid $primary;
      //   border-radius: 3px;
      //   margin-top: -16px;
      //   margin-left: 8px;
      //   position: relative;
      //   z-index: -1;
      // }
    }
  }
  .title-logo{
    height: 1em;
    width: auto;
    display: block;
    vertical-align: middle;
    // 10817 【首页】-【登录】，logo显示位置和大小不正确 20200908
    img {
      height: 100%;
      width: auto;
    }
    font-size: 2em;
  }

  .title-text{
    display: block;
    // text-align: center;
    // vertical-align: middle;
    // text-shadow: 0 0 1px rgba(0,0,0,.6);
  }

//   .show-pwd {
//     position: absolute;
//     right: 10px;
//     top: 7px;
//     font-size: 16px;
//     color: lighten($input-color, 30%);
//     cursor: pointer;
//     user-select: none;
//   }

//   .thirdparty-button {
//     position: absolute;
//     right: 0;
//     bottom: 6px;
//   }
}

.login-form {
  position: relative;
  width: 400px;
  max-width: 100%;
  // padding: 32px;
  margin: 32px auto 0 auto;
  // overflow: hidden;
  z-index: 2;

}

.login-form-body{

  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f7f7f7;
  box-shadow:  0 4px 12px rgba(0,0,0, .1);
  .login-submit{
    display: block;
    width: 100%;
    margin: 32px auto 0 auto;
  }
  // .el-form-item--mini.el-form-item,.el-form-item--small.el-form-item{
  //   margin-bottom: 18px;
  //   margin-top: 0;
  // }
}

</style>
