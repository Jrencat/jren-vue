<template>
  <div class="page">
    <section>
      <el-row v-if="pdfShowDialog">
        <el-col :span="22">
          <el-row type="flex" justify="center">
            <el-col :span="24" type="flex" justify="center" style="border: 0px solid #000;width: 1000px">
              <el-row>
                <pdf :url="pdfUrl" :type="'canvas'" :pdfjs-dist-path="getConfig()" />
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="1" />
      </el-row>
    </section>
  </div>
</template>

<script>
import pdf from './index';
import { getConfig } from '@/utils/core';

export default {
  name: "PreviewPdf",
  components: {
    pdf
  },
  props: {
    pdfUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      pdfShowDialog: true
    };
  },
  mounted() {
  },
  methods: {
    getConfig() {
      return getConfig('PDFJS-DIST-PATH');
    },
  }
}
</script>

<style scoped>

</style>
