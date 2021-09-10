<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'IframeIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'IframeList', path: '/forntend/pdf/iframe/list', meta: { title: '客户管理', unitCode: 'U070101' }}
      ]
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
};
</script>
