import store from '@/store';

const { body } = document;
const WIDTH = 883; // refer to Bootstrap's responsive design

export default {
  watch: {
    // $route(route) {
    //   if (this.device === 'mobile' && this.sidebar.visible) {
    //     store.dispatch('app/toggleSideBarVisible', { visible: false, withoutAnimation: false });
    //   }
    // }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler);
  },
  mounted() {
    this.handleScreenSize();
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        this.handleScreenSize();
      }
    },
    handleScreenSize() {
      // return;
      const isMobile = this.$_isMobile();
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');
      store.dispatch('app/toggleSideBarVisible', { visible: !isMobile });
    }
  }

};
