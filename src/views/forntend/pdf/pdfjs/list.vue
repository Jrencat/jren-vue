<template>
  <div class="page">
    <section class="page-section">
      <el-row :gutter="12" style="height: 1160px">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%; border: 1px solid skyblue">
          <el-row :gutter="12">
            <el-col :span="24">
              <div class="title">
                <H1>Pdfjs</H1>
                <a class="target" ref="target" href="" target="_blank"></a>
              </div>
            </el-col>
          </el-row>
          <el-form ref="dataForm" :model="dataForm" label-width="120px" label-suffix=":">
            <el-row :gutter="12">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="URL地址" prop="url">
                  <el-input v-model="dataForm.url" type="textarea" placeholder="请输入URL地址" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="12">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="base64数据" prop="base64">
                  <el-input v-model="dataForm.base64" type="textarea" placeholder="请输入base64数据" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div class="table">
            <el-table
                ref="multipleTable"
                tooltip-effect="dark"
                style="width:100%"
                :loading="loading"
                :max-height="500"
                :data="dataList"
                :show-header="true"
                :stripe="true"
                :border="false"
                size="medium"
                :fit="true"
                :highlight-current-row="true"
            >
              <template v-for="(column,index) in columns">
                <el-table-column
                    v-if="column.visible"
                    :key="column.prop"
                    min-width="150"
                    :show-overflow-tooltip="true"
                    :fixed="index === -1"
                    align="center"
                    :prop="column.prop"
                    :label="column.label"
                >
                  <template slot-scope="scope">
                    <span v-if="column.type === 'String'">{{ scope.row[column.prop] }}</span>
                    <span v-if="column.type === 'Date'">{{ scope.row[column.prop] | dateYMDHMSFormat(column.date) }}</span>
                    <span v-if="column.type === 'Enum'">{{ $_enumName(column.enum, scope.row[column.prop]) }}</span>
                    <span v-if="column.type === 'Dict'">{{ $_dictName(column.dict, scope.row[column.prop]) }}</span>
                  </template>
                </el-table-column>
              </template>
              <el-table-column fixed="right" label="URL" min-width="100" align="center" :resizable="false">
                <template slot-scope="scope">
                  <el-button class="operationButton" type="primary" size="mini" @click="operationItem(scope.row, 'url')">查看</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Base64" min-width="100" align="center" :resizable="false">
                <template slot-scope="scope">
                  <el-button class="operationButton" type="primary" size="mini" @click="operationItem(scope.row, 'base64')">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="height: 100%">
          <pdf v-if="showDialog" width='100%' height='100%' :url="pdfUrl" :type="'canvas'" :pdfjs-dist-path="getConfig()" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import columnFilter from '@/utils/columnFilter';
import { base64ToLink } from '@/api/base64Utils';
import pdf from '@/components/Pdfjs/index';
import { getConfig } from '@/utils/core';

export default {
  name: "PdfjsList",
  mixins: [columnFilter],
  components: {
    pdf
  },
  data() {
    const defaultColumns = [
      { label: '描述', prop: 'describe', visible: true, disabled: false, type: 'String' }
    ];
    const columns = this.$_getColumns(defaultColumns);
    return {
      showDialog: false,
      pdfUrl: undefined,
      columns: columns,
      loading: false,
      dataForm: {
        url: undefined,
        base64: undefined
      },
      dataList: [
        {
          describe: '在当前页面打开',
          type: 'nowPage'
        },
        {
          describe: '在新页面打开',
          type: 'newPage'
        }
      ]
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    getConfig() {
      return getConfig('PDFJS-DIST-PATH');
    },
    init() {
      this.dataForm.url = 'http://124.70.134.251/pdf/checkReport/44010012021000008WT/安全阀校验报告_44010012021000003BG.pdf';
      this.dataForm.base64 = '';
    },
    operationItem(row, type) {
      let msg = '';
      if (type === 'url') {
        msg = this.$_checkIsEmpty(this.dataForm.url) ? '请输入URL' : '';
      }
      if (type === 'base64') {
        msg = this.$_checkIsEmpty(this.dataForm.base64) ? '请输入Base64' : this.dataForm.base64.startsWith('data:application/pdf;base64,') ? '' : '请输入正确的Base64';
      }
      if (!this.$_checkIsEmpty(msg)) {
        this.$message({
          message: msg,
          type: 'warning'
        });
        return;
      }
      this.dataProcessimg(row, type);
    },
    dataProcessimg(row, type) {
      let url = '';
      if (type === 'url') {
        url = this.dataForm.url;
      }
      if (type === 'base64') {
        url = base64ToLink(this.dataForm.base64);
      }
      if (row.type === 'nowPage') {
        this.openOnNowPage(url);
      }
      if (row.type === 'newPage') {
        this.openOnNewPage(url);
      }
    },
    openOnNowPage(url) {
      this.pdfUrl = url;
      this.showDialog = true;
    },
    openOnNewPage(url) {
      let target = this.$refs.target;
      target.setAttribute('href', window.location.origin + '/#/components/pdfjs?url=' + url +'&pdfjsDistPath=' + this.getConfig());
      target.click();
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
