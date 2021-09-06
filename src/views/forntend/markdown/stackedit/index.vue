<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'StackeditIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'StackeditList', path: '/forntend/markdown/stackedit/list', meta: { title: '客户管理', unitCode: 'U070101' }}
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
