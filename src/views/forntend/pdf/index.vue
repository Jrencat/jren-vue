<template>
  <div>
    <RouteTabs :items="routes" style="background: powderblue"/>
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: "PdfIndex",
  components: {
    RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'IframeList', path: '/forntend/pdf/iframe/list', meta: { title: 'iframe'}},
        { name: 'PdfjsList', path: '/forntend/pdf/pdfjs/list', meta: { title: 'pdfjs'}},
        { name: 'LodopList', path: '/forntend/pdf/lodop/list', meta: { title: 'lodop'}}
      ]
    };
  },
}
</script>

<style scoped>

</style>
