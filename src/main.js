import Vue from 'vue';
import './styles/css-variables.css';
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/xq-light.css";
import "codemirror/mode/css/css";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/css-hint.js";


import 'normalize.css/normalize.css'; // a modern alternative to CSS resets
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';

import App from './App';
import store from './store';
import router from './router';
import mavonEditor from  'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);
import './router/router.guard'; // permission control
import * as filters from './filters'; // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
import element from 'element-ui';
import './styles/element-variables.scss';
import '@/styles/index.scss'; // global css
Vue.use(element, {
  size: 'small' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
});

import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.moment = moment;
Vue.filter('dateYMDHMSFormat', function(dateStr, pattern) {
  return (dateStr === null || dateStr === undefined || dateStr === '') ? null : moment(dateStr).format(pattern);
});

import { CtStorage, bootstrap, updateCssVariables } from './utils/core';
import { mapGetters } from 'vuex';
Vue.config.productionTip = false
const loadingDom = document.querySelector('#sys-loading');
Vue.mixin({
  computed: {
    ...mapGetters([
      'enum',
      'settings'
    ])
  },
  methods: {
    $_showLoading() {
      loadingDom.style.display = 'block';
      loadingDom.style.opacity = 1;
    },
    $_hideLoading() {
      loadingDom.style.opacity = 0;
      setTimeout(() => {
        loadingDom.style.display = 'none';
      }, 200);
    },
    $_showMessage(res, onClose) {
      this.$message({
        message: res.message,
        dangerouslyUseHTMLString: true,
        type: res.result === 1 ? 'success' : 'error',
        onClose
      });
    },
    $_enumName(type, value) {
      const list = this.$store.state.enum.enum[type];
      if (this.$_checkIsEmpty(list)) {
        return value;
      }
      const result = list.filter(item => String(item.id) === String(value))[0];
      return result ? result.name || value : value;
    },
    $_dictName(type, value) {
      var dictData = CtStorage.getItem(type);
      if (this.$_checkIsEmpty(dictData)) {
        return value;
      }
      const result = dictData.filter(item => String(item.dictItemCode) === String(value))[0];
      return result ? result.dictItemName || value : value;
    },
    $_enumList(type) {
      return this.enum && this.enum[type] || [];
    },
    $_computeIndex(index) {
      if (this.page !== null && this.page.pageNo >= 0 && this.page.pageSize >= 0) {
        return (this.page.pageNo - 1) * this.page.pageSize + index + 1;
      } else {
        return index;
      }
    },
    $_checkIsEmpty(object) {
      return Array.isArray(object) ? !object.length : !object;
    }
  }
});
Vue.config.productionTip = false;
App.mpType = "app";

bootstrap().then(() => {
  document.body.classList.add('ct-app');
  const app = new Vue({
    el: '#app',
    router,
    store,
    ...App,
    created() {
      const theme = this.settings.theme;
      if (theme) {
        updateCssVariables(theme, this);
      }
    },
    render: h => h(App)
  });
  app.$mount();
}).catch(function(error) {
  console.error(error);
});
