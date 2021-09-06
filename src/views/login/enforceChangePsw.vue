<template>
  <!-- 修改密码 -->
  <div class="page">
    <el-row type="flex" justify="center" align="middle" style="height: 80%;">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="form-title">
          请修改密码
        </div>
        <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="6em" label-position="left" class="demo-ruleForm">
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="原始密码" prop="oldPwd">
                <el-input v-model="ruleForm.oldPwd" type="password" autocomplete="off" maxlength="20" placeholder="请输入原始密码" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 密码6-16位 -->
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="新密码" prop="newPwd">
                <el-input v-model="ruleForm.newPwd" type="password" autocomplete="off" maxlength="20" placeholder="请输入新密码" />
                <small class="el-form-item__error" style="color: #999; text-align: right; width: 100%">密码是6-12位的任意组合</small>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
              <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model="ruleForm.checkPwd" type="password" autocomplete="off" maxlength="20" placeholder="请再次输入新密码" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="footer">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { changePassword } from '@/api/user';
import { mapGetters } from 'vuex';
export default {
  name: 'ChangePsw',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPwd !== '') {
          this.$refs.ruleForm.validateField('checkPwd');
        }
        callback();
      }
    };
    const validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else if (value === this.ruleForm.oldPwd) {
        callback(new Error('新密码与旧密码不能一致'));
      } else if (value.length > 5 && value.length < 13) {
        callback();
      } else {
        callback(new Error('请输入指定长度的新密码'));
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      rules: {
        oldPwd: [{ required: true, trigger: 'blur', validator: validatePass }],
        newPwd: [{ required: true, validator: validateNewPass, trigger: 'blur' }],
        checkPwd: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const parmas = {
            loginName: this.user.loginName.trim(),
            oldPwd: this.ruleForm.oldPwd.trim(),
            newPwd: this.ruleForm.newPwd.trim()
            // versionNo (integer, optional): 版本号
          };
          changePassword(parmas).then(res => {
            if (res.result === 1) {
              this.$message.success(res.msg);
              this.resetForm = {};
              this.$router.push('/login');
            } else {
              this.$message.warning(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.newPwd = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
body, html{
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
.page{
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.form-title {
  text-align: center;
  font-weight: 800;
  color: red;
  font-size: 2rem;
  margin-bottom: 3rem;
}
.footer{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  margin-top: 2rem;
  padding: 10px;
  background-color: #fff;
  display: block;
  text-align: center;
}
</style>
