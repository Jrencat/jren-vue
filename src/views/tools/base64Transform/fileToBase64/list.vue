<template>
  <div class="page">
    <section class="page-section">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="title">
            <H1>文件转base64</H1>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="12" style="height: 700px">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%; border: 1px solid skyblue">
          <div id="fileDiv" class="fileDiv" style="width: 100%; height: 100%">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%; border: 1px solid skyblue">
          <el-input id="base64Text" style="width: 100%; height: 100%" v-model="base64Text" type="textarea" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
export default {
  name: "FileToBase64List",
  data() {
    return {
      base64Text: undefined
    }
  },
  mounted() {
    this.init1();
    this.init2();
  },
  methods: {
    init2() {
      const that = this;
      window.document.getElementById('fileDiv').addEventListener("dragenter", function(event) { event.preventDefault(); }, false);
      window.document.getElementById('fileDiv').addEventListener("dragover", function(event) { event.preventDefault(); }, false);
      window.document.getElementById('fileDiv').addEventListener("drop", function(event) {
        var reader = new FileReader();
        reader.onload = function(e) {
          // window.document.getElementById('base64Text').insertAdjacentHTML("afterBegin", '<p style="word-break:break-word">' + e.target.result + '</p>');
          that.base64Text = e.target.result;
        };
        reader.readAsDataURL(event.dataTransfer.files[0]);
        event.preventDefault();
      }, false);
    },
    init1() {
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-11205167-1']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      })();
    }
  }
}
</script>

<style lang="scss" scoped>

.title{
  text-align: center;
}
.fileDiv::before {
  font-size: 50px;
  content: '任意文件\A拖到这里';
  white-space: pre;
  color: gray;
}
.fileDiv {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  text-align: justify;
  margin:0 auto;
}
::v-deep {
  .el-textarea__inner{
    height: 99% !important;
    margin: 5px 5px 0px 0px;
  }
}

</style>
