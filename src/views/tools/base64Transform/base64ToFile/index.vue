<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'Base64ToFileIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'Base64ToFileList', path: '/tools/base64Transform/base64ToFile/list', meta: { title: '客户管理', unitCode: 'U070101' }}
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
