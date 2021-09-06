import router from './index';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import checkPermission from '../utils/permission';
import { resolveDict } from '@/utils/dict';
import { getConfig, isAuthenticated } from '@/utils/core';
import store from '@/store';

export function getPageTitle(pageTitle) {
  const title = getConfig('APP.NAME');
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}

NProgress.configure({ showSpinner: true }); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/redirect/*', '/error', '/404', '/401', '/', '/changePsw']; // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // store.to.meta.title
  next();

  // return;
  // start progress bar
  // eslint-disable-next-line no-unreachable
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  const passed = isAuthenticated();

  if (passed) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      // next({ path: '/' });
      NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const safe = whiteList.includes(to.path) || to.path.indexOf('/redirect/') === 0;
      let action = to.path;
      const values = Object.values(to.params);
      if (values.length > 0) {
        action = to.path.substring(0, to.path.length - ('/' + values[0]).length);
      }

      // const hasPermission = safe || !safe && (action ? checkPermission(action) : true);
      const hasPermission = true;
      if (hasPermission) {
        next();
        NProgress.done();
      } else {
        next({ path: '/401', replace: false });
        NProgress.done();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.includes(to.path)) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`);
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
