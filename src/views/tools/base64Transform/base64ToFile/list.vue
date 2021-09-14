<template>
  <div class="page">
    <section class="page-section">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="title">
            <H1>base64转文件</H1>
            <el-button type="primary" icon="el-icon-download" @click="base64ToFile">生成文件</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="height: 660px;margin-top: 5px">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="height: 100%; border: 1px solid skyblue">
          <el-input id="base64Text" style="width: 100%; height: 100%" v-model="base64Text" type="textarea" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import fileType from '@/api/fileType.json';

export default {
  name: "Base64ToFileList",
  data() {
    return {
      base64Text: undefined,
      fileName: undefined,
      suffix: undefined
    }
  },
  mounted() {
  },
  methods: {
    base64ToFile() {
      if (this.$_checkIsEmpty(this.base64Text)) {
        this.$message({
          type: 'warning',
          message: '请输入base64数据！'
        });
        return;
      }
      let type = this.base64Text.split(',')[0].match(/:(.*?);/);
      if (this.$_checkIsEmpty(type)) {
        this.$message({
          type: 'warning',
          message: '请输入正确的base64数据！'
        });
        return;
      }
      try {
        this.createFile();
      } catch (e) {
        if (e.name === 'InvalidCharacterError') {
          this.$message({
            type: 'warning',
            message: 'base64数据源错误！'
          });
        }
      }
    },
    createFile() {
      var blob = this.dataUrlToBlob(this.base64Text);
      var file = this.blobToFile(blob, '文件.' + this.suffix);
      var a = document.createElement('a');
      var url = window.URL.createObjectURL(file);
      a.href = url;
      a.download = '文件.' + this.suffix;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    dataUrlToBlob(dataUrl) {
      var arr = dataUrl.split(',');
      var mime = arr[0].match(/:(.*?);/)[1];
      this.suffix = fileType.fileType[mime] !== null ? fileType.fileType[mime] : mime.split('/')[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    blobToFile(theBlob, fileName) {
      theBlob.laseModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
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
    height: 99% !important;
    margin: 5px 5px 0px 0px;
  }
}

</style>
