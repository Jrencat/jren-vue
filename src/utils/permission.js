import store from '@/store';

/**
 * @param {Array} code unitCode or unitAction
 * @returns {Boolean}
 */
export default function checkPermission(code) {
  let hasPermission = false;
  if (code && typeof code === 'string') {
    const acls = store.getters && store.getters.acls;
    if (acls instanceof Array) {
      hasPermission = acls.includes(code);
    }
  } else {
    console.error(`need roles! Like v-acl="U00001"`);
  }
  return hasPermission;
}

