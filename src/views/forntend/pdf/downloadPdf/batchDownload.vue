<template>
  <section>
    <el-row :gutter="12">
      <el-col :span="24">
        <div class="title">
          <H1>批量下载pdf</H1>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24" align="middle">
        <el-button type="primary" @click="addInput">+</el-button>
      </el-col>
    </el-row>
    <el-form ref="dataForm" :model="dataForm" label-width="120px" label-suffix=":">
      <div v-for="(item,index) in arrayData" :key="item.id">
        <el-row :gutter="12">
          <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
            <el-form-item label="URL地址" required>
              <el-input v-model="item.data" type="input" placeholder="请输入URL地址" />
            </el-form-item>
          </el-col>
          <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button type="danger" @click="deleteInput(item, index)">-</el-button>
          </el-col>
        </el-row>
      </div>
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
            <el-button class="operationButton" type="primary" size="mini" @click="operationItem(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import columnFilter from '@/utils/columnFilter';
import { downloadPdfByUrl, packageDowload } from '@/api/downloadUtils';

export default {
  name: "BatchDownload",
  mixins: [columnFilter],
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
      arrayData:[
        {
          id: 1,
          data: 'https://www.jren.top/file/pdf/图论.pdf'
        },
        {
          id: 2,
          data: 'https://www.jren.top/file/pdf/Mysql管理维护手册.pdf'
        }
      ],
      dataForm: {
        data: undefined
      },
      dataList: [
        {
          describe: '批量下载',
          type: 'batchDownload'
        },
        {
          describe: '批量打成压缩包下载',
          type: 'zipDownload'
        }
      ],
      dataNum: 2
    }
  },
  mounted() {},
  methods: {
    deleteInput(item,index){
      if(this.arrayData.length<=1){//如果只有一个输入框则不可以删除
        return false
      }
      this.arrayData.splice(index,1)//删除了数组中对应的数据也就将这个位置的输入框删除
    },
    addInput(){
      this.arrayData.push(//增加就push进数组一个新值
          {
            id: this.dataNum++,
            data:''
          }
      )
    },
    operationItem(row) {
      if (this.arrayData.length === 0) {
        this.$message({
          message: '请输入URL',
          type: 'warning'
        });
        return;
      }

      let urls = [];
      this.arrayData.forEach(item => {
        if (!this.$_checkIsEmpty(item.data)) {
          urls.push(item.data);
        }
      })

      if (this.$_checkIsEmpty(urls)) {
        this.$message({
          message: '请输入URL',
          type: 'warning'
        });
        return;
      }
      this.dataProcessimg(row, urls);
    },
    async dataProcessimg(row, urls) {
      try {
        if (row.type === 'batchDownload') {
          this.batchDownload(urls);
        }
        if (row.type === 'zipDownload') {
          this.zipDownload(urls);
        }
      } catch (e) {
        this.$message({
          message: e,
          type: 'warning'
        });
      }
    },
    batchDownload(urls) {
      urls.forEach((item, index) => {
        downloadPdfByUrl(this, item, '文件' + index + '.pdf');
      });
    },
    zipDownload(urls) {
      this.$_showLoading();
      packageDowload(this, urls);
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
