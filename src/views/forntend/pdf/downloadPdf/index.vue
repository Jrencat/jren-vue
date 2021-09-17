<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'DownloadPdfIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'DownloadPdfList', path: '/forntend/pdf/downloadPdf/list', meta: { title: '客户管理', unitCode: 'U070101' }}
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
