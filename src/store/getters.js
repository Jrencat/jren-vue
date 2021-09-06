const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  user: state => state.user.info,
  token: state => state.user.token,
  acls: state => state.user.acls,
  menus: state => state.user.menus,
  unitMap: state => state.user.unitMap,
  enum: state => state.enum.enum,
  routes: state => state.user.routes,
  visitedViews: state => state.tabs.visitedViews,
  cachedViews: state => state.tabs.cachedViews,
  settings: state => state.settings
};
export default getters;
