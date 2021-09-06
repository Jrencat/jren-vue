<template>
  <div>
    <RouteTabs :items="routes" />
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: "MarkdownIndex",
  components: {
    RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'DoocsmdList', path: '/forntend/markdown/doocsmd/list', meta: { title: 'doocsmd'}},
        { name: 'StackeditList', path: '/forntend/markdown/stackedit/list', meta: { title: 'stackedit'}},
        { name: 'MavonEditorList', path: '/forntend/markdown/mavonEditor/list', meta: { title: 'mavonEditor'}},
        { name: 'MavonEditorTwoList', path: '/forntend/markdown/mavonEditorTwo/list', meta: { title: 'mavonEditorTwo'}},
        { name: 'MarkedList', path: '/forntend/markdown/marked/list', meta: { title: 'marked'}}
      ]
    };
  },
}
</script>

<style scoped>

</style>
