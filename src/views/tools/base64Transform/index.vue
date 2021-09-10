<template>
  <div>
    <RouteTabs :items="routes" />
    <router-view />
  </div>
</template>

<script>
import RouteTabs from '@/components/RouteTabs';

export default {
  name: "Base64TransformIndex",
  components: {
    RouteTabs
  },
  data() {
    return {
      routes: [
        { name: 'FileToBase64List', path: '/tools/base64Transform/fileToBase64/list', meta: { title: '文件转base64'}},
        { name: 'Base64ToFileList', path: '/tools/base64Transform/base64ToFile/list', meta: { title: 'base64转文件'}}
      ]
    };
  },
}
</script>

<style scoped>

</style>
