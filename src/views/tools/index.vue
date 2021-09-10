<template>
  <div>
    <!-- <RouteTabs :items="routes" /> -->
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: 'ToolsIndex',
  components: {
    // RouteTabs
  },
  data() {
    return {
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
