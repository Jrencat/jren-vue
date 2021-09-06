<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'MavonEditorTwoIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'MavonEditorTwoList', path: '/forntend/markdown/mavonEditorTwo/list', meta: { title: '客户管理', unitCode: 'U070101' }}
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
