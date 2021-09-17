<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'MergePdfIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'MergePdfList', path: '/forntend/pdf/mergePdf/list', meta: { title: '客户管理', unitCode: 'U070101' }}
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
