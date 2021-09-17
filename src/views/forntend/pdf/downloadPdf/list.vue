<template>
  <div class="page">
    <section class="page-section">
      <el-row :gutter="12">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="title" style="">
            <el-radio v-model="downloadFlg" border="true" size="medium" label="single">单个下载</el-radio>
            <el-radio v-model="downloadFlg" border="true" size="medium" label="batch">批量下载</el-radio>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="height: 1160px;margin-top: 10px">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%; border: 1px solid skyblue">
          <SingleDownload v-if="downloadFlg === 'single'"/>
          <BatchDownload v-if="downloadFlg === 'batch'"/>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import BatchDownload from './batchDownload';
import SingleDownload from './singleDownload';
export default {
  name: "DownloadPdfList",
  components: {
    BatchDownload,
    SingleDownload
  },
  data() {
    return {
      downloadFlg: 'single'
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  text-align: center;
}
::v-deep {
  .el-textarea__inner{
    min-height: 100px !important;
  }
}
</style>
